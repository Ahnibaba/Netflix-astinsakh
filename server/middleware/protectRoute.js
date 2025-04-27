import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"
import userModel from "../models/user.model.js"

export const protectRoute = async(req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"]

    if(!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
    }

    const decoded = jwt.verify(
        token,
        ENV_VARS.JWT_SECRET
    )
    if(!decoded) {
        return res.status(403).json({ success: false, message: "Forbidden - Invalid Token" })  
    }

    const user = await userModel.findById(decoded.userId).select("-password")
    
    if(!user) {
        return res.status(404).json({ success: false, message: "User not found" })  
    }

    req.user = user

    next()
} catch (error) {
    console.log("Error in protectRoute middleware: ", error.message)
    return res.status(500).json({ success: false, message: "Internal Server Error" })  
    
  }
}