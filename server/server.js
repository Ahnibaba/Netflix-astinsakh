import express from "express"
// import crypto from "crypto"

// console.log(crypto.randomBytes(64).toString("hex"))



import authRoutes from "./routes/auth.route.js"
import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"


const app = express()
const PORT = ENV_VARS.PORT

app.use(express.json()) // will allow us to parse req.body

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    connectDB()
})