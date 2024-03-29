import { App, HttpRequest, HttpResponse } from "uWebSockets.js"
import { createSchema, createYoga, Repeater } from "graphql-yoga"
import { Readable } from "node:stream"
import { makeBehavior } from "graphql-ws/lib/use/uWebSockets"
import { ExecutionArgs, execute, subscribe } from "graphql"

interface ServerContext {
  req: HttpRequest
  res: HttpResponse
}

export const yoga = createYoga<ServerContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }

      type Subscription {
        time: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world!"
      },
      Subscription: {
        time: {
          subscribe: () =>
            new Repeater((push, stop) => {
              const interval = setInterval(() => {
                push({
                  time: new Date().toISOString()
                })
              }, 1000)
              stop.then(() => clearInterval(interval))
            })
        }
      }
    }
  }),
  graphiql: {
    subscriptionsProtocol: "WS"
  }
})

const yogaHandler = async (res: HttpResponse, req: HttpRequest) => {
  let body: any
  const method = req.getMethod()
  if (method !== "get" && method !== "head") {
    body = new Readable({
      read() {}
    })
    res
      .onData(function (chunk, isLast) {
        body.push(Buffer.from(chunk))
        if (isLast) {
          body.push(null)
        }
      })
      .onAborted(function () {
        body.push(null)
      })
  }
  const headers = {}
  req.forEach((key, value) => {
    headers[key] = value
  })
  const response = await yoga.fetch(
    req.getUrl(),
    {
      method,
      headers,
      body
    },
    {
      req,
      res
    }
  )
  res.writeStatus(`${response.status} ${response.statusText}`)
  response.headers.forEach((value, key) => {
    if (key === "content-length") {
      return
    }
    res.writeHeader(key, value)
  })
  if (response.body) {
    if (response.body instanceof Uint8Array) {
      res.end(response.body)
      return
    }
    for await (const chunk of response.body) {
      res.write(chunk)
    }
  }
  res.end()
}

type EnvelopedExecutionArgs = ExecutionArgs & {
  rootValue: {
    execute: typeof execute
    subscribe: typeof subscribe
  }
}

const wsHandler = makeBehavior({
  execute: (args) => (args as EnvelopedExecutionArgs).rootValue.execute(args),
  subscribe: (args) =>
    (args as EnvelopedExecutionArgs).rootValue.subscribe(args),
  onSubscribe: async (ctx, msg) => {
    const { schema, execute, subscribe, contextFactory, parse, validate } =
      yoga.getEnveloped(ctx)

    const args: EnvelopedExecutionArgs = {
      schema,
      operationName: msg.payload.operationName,
      document: parse(msg.payload.query),
      variableValues: msg.payload.variables,
      contextValue: await contextFactory(),
      rootValue: {
        execute,
        subscribe
      }
    }

    const errors = validate(args.schema, args.document)
    if (errors.length) return errors
    return args
  }
})

App()
  .any("/*", yogaHandler)
  .ws("/graphql", wsHandler)
  .listen(4000, (token) => {
    if (token) {
      console.log("Listening to port 4000")
    } else {
      console.log("Failed to listen to port 4000")
    }
  })
