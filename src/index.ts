import "dotenv/config"
import express from "express"
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"
import application from "./config/application"
import initialize from "./lib/initialize"
import router from "./router"
const app = express()
const httpServer = http.createServer(app)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, _, next) => {
  req.meta.date = new Date()
  req.meta.method = req.method
  req.meta.start = new Date().getMilliseconds()
  next()
})
app.use("/security", router)
app.use((req, _, next) => {
  req.meta.finish = new Date().getMilliseconds()
  next()
})
httpServer.listen(application.port, async () => {
  await initialize()
  console.log(
    `Api "${application.name}" running on: ${application.host}:${application.port}`
  )
})
