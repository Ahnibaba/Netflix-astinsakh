import { useEffect, useState } from "react"
import { useContentStore } from "../store/content"
import axios from "../lib/axios"



const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null)
  const [trendingContentLoading, setTrendingContentLoading] = useState(true)
  const { contentType } = useContentStore()

  console.log(contentType);
  


  useEffect(() => {
    const getTrendingContent = async () => {
      setTrendingContent(true)
      try {
        const response = await axios.get(`/v1/${contentType}/trending`) 
        setTrendingContent(response.data.content)  
      } catch (error) {
        console.log(error);
        
      } finally {
        setTrendingContentLoading(false)
      }
    }

    getTrendingContent()
  }, [contentType])

  return { trendingContent, trendingContentLoading }
}

export default useGetTrendingContent