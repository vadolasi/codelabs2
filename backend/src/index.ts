import { Network, AnonymousAuth } from "ataraxia"
import { WebSocketServerTransport } from "ataraxia-ws-server"

const net = new Network({
  name: "codelabs",
  transports: [
    new WebSocketServerTransport({
      port: 8000,
      authentication: [
        new AnonymousAuth()
      ]
    })
  ]
})

await net.join()
