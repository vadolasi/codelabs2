import { Server } from "hyper-express"
import { Server as SocketIO } from "socket.io"
import parser from "socket.io-msgpack-parser"
import { createAdapter } from "@socket.io/cluster-adapter"
import { setupWorker } from "@socket.io/sticky"
import { usersRouter } from "./modules/users"
import { unpack, pack } from "msgpackr"

const app = new Server()

app.use((req, res, next) => {
  req.json = async () => unpack(await req.body())
  res.json = (data) => Boolean(res.send(pack(data)))
  next()
})

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

app.use("/users", usersRouter)

app.listen(8000)
  .then(() => console.log("Server listening on http://localhost:8000"))
  .catch(console.error)
