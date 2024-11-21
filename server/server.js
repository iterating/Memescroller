import express from "express"

import middleware from "./api/middleware/middleware.js"
import dotenv from "dotenv"
const PORT = process.env.PORT || 3000
dotenv.config()

const app = express()
import routes from "./api/routes/routes.js"

middleware(app)
app.use(routes)


app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
