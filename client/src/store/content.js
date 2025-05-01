import { create } from "zustand";


export const useContentStore = create((set) => ({
   contentType: localStorage.getItem("content-type"),
   setContentType: (contentType) => set({ contentType }) 
}))