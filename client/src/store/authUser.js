import axios from "../lib/axios"
import { create } from "zustand"
import toast from "react-hot-toast"


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,

    signup: async (values) => {
      const { username, email, password } = values
      set({ isSigningUp: true })  
      try {
        const response = await axios.post("/v1/auth/signup", { username, email, password })
        set({ user: response.data.user, isSigningUp: false })
        toast.success("Account created successfully")
        return true
    } catch (error) {
        toast.error(error.response.data.message || "Sign up failed")
        set({ isSigningUp: false, user: null })
        return false
      }
    },

    login: async (values) => {
      const { email, password } = values
      set({ isLoggingIn: true })

      try {
        const response = await axios.post("/v1/auth/login", { email, password })
        set({ user: response.data.user, isLoggingIn: false })
        toast.success("Logged in successfully")
      } catch (error) {
        set({ user: null, isLoggingIn: false })
        toast.error(error.response.data.message || "Login Failed")
      }
    },
    logout: async () => {
      set({ isLoggingOut: true })
      try {
        await axios.post("/v1/auth/logout")
        set({ user: null, isLoggingOut: false })
        toast.success("Logged out successfully")
      } catch (error) {
        set({ user: null, isLoggingOut: false })
        toast.error(error.response.data.message || "Logout failed")
      }
    },
    authCheck: async () => {
      set({ isCheckingAuth: true })
      try {
        const response = await axios.get("/v1/auth/authCheck")
        set({ user: response.data.user, isCheckingAuth: false })
      } catch (error) {
        console.log(error);
        
        set({ isCheckingAuth: false, user: null })
      }
    },
}))