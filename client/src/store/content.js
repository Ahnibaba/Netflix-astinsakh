import { create } from "zustand";


export const useContentStore = create((set) => ({
   contentType: localStorage.getItem("content-type") || "movie",
   setContentType: (contentType) => set({ contentType }) 
}))