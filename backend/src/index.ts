import { Server } from "hyper-express"
import { Server as SocketIO } from "socket.io"
import parser from "socket.io-msgpack-parser"
import { createAdapter } from "@socket.io/cluster-adapter"
import { setupWorker } from "@socket.io/sticky"

const app = new Server()

const io = new SocketIO({ parser, transports: ["websocket"] })
io.attachApp(app)
io.adapter(createAdapter())
setupWorker(io)

io.on("connection", (socket) => {
  console.log(`${socket.id} joined`)
  socket.on("disconnect", () => {
    console.log(`${socket.id} left`)
  })
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 8000

app.listen(port)
  .then(() => console.log(`Server listening on http://localhost:${port}`))
  .catch(console.error)
