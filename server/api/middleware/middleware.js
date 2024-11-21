import express from "express"
import cors from "cors"

const middleware = (app) => {
  app.use(cors({ origin: "*" }))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Logging middleware
  app.use((req, res, next) => {
    const time = new Date()
    console.log(
      `-----\n${time.toLocaleTimeString()}: Received a ${
        req.method
      } request to ${req.url}`
    )
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:")
      console.log(JSON.stringify(req.body))
    }
    next()
  })
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error("Error:", err)
    res.status(500).json({ error: err.message || "Internal Server Error" })
  })
}

export default middleware
