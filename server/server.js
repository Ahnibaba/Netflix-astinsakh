import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import job from "./cron/cron.js"

import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js"

import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"
import { protectRoute } from "./middleware/protectRoute.js"



job.start()


const app = express()
const PORT = ENV_VARS.PORT
const __dirname = path.resolve()

app.use(express.json()) // will allow us to parse req.body
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)

if(ENV_VARS.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/client/dist")))
   
   app.get("*", (req, res) => {
     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
   })
}

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    connectDB()
})



// import crypto from "crypto"

// console.log(crypto.randomBytes(64).toString("hex"))