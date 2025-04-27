import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

const signup = async(req, res) => {
  try {
    const { email, password, username } = req.body

    if(!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" })
    }

    if(password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
    }

    const existingUserByEmail = await userModel.findOne({ email })

    if(existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" })
    }

    const existingUserByUsername = await userModel.findOne({ username })

    if(existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const PROFILE_PICS = ["/avatar.png", "/avatar2.png", "/avatar3.png"]

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]
   
    const newUser = new userModel({
      email,
      password: hashedPassword,
      username,
      image
    })

      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: { ...newUser.toJSON(), password: null }
      })
    
   
  } catch (error) {
    console.log("Error in signup function", error.message)
    
    
  }
}
const login = async(req, res) => {
  try {
    const { email, password } = req.body

    if(!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const user = await userModel.findOne({ email })
    if(!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" })
    }

    generateTokenAndSetCookie(user._id, res)
      

      res.status(200).json({
        success: true,
        message: "User Logged in successfully",
        user: { ...user.toJSON(), password: null }
      })
    
  } catch (error) {
    console.log("Error in login function", error.message)
    res.status(500).json({ success: false, message: "Server Error" })
    
  }
}
const logout = async(req, res) => {
  try {
    res.clearCookie("jwt-netflix")
    res.status(200).json({ success: true, message: "Logged out successfully" })
  } catch (error) {
    console.log("Error in logout function", error.message)
    res.status(500).json({ success: false, message: "Server Error" })
    
  }
}

export { signup, login, logout }