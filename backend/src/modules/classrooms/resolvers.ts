import { Router } from "hyper-express"

export const router = new Router()

router.post("/", (_req, res) => {
  res.send("Hello World!")
})
