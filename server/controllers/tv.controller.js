import { fetchFromTMDB } from "../services/tmdb.service.js"



const getTrendingTv = async(req, res) => {
   try {
     const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
     const randomTv = data.results[Math.floor(Math.random() * data.results?.length)]

     res.json({ success: true, content: randomTv })
   } catch (error) {
     console.log("Error in the getTrendingTv function: ", error.message)
     res.status(500).json({ success: false, message: "Internal Server Error" })
     
   }
} 

const getTvTrailers = async(req, res) => {
    const { id } = req.params 
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
      res.json({ success: true, trailers: data.results })
    } catch (error) {
      if(error.message.includes("404")) {
        return res.status(404).send(null)
      }  
      console.log("Error in the tvTrailers function: ", error.message)
      res.status(500).json({ success: false, message: "Internal Server Error" }) 
    }
}

const getTvDetails = async(req, res) => {
    const { id } = req.params
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)  
      res.status(200).json({ success: true, content: data })
    } catch (error) {
        console.log("Error in the getTvDetails function: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })   
    }
}

const getSimilarTvs = async(req, res) => {
  
  const { id } = req.params
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, similar: data.results })
} catch (error) {
    console.log("Error in the getSimilarTvs function: ", error.message)
    res.status(500).json({ success: false, message: "Internal Server Error" })   
  }
} 

const getTvsByCategory = async(req, res) => {
  const { category } = req.params  
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    console.log("Error in the getTvsByCategory function: ", error.message)
    res.status(500).json({ success: false, message: "Internal Server Error" })   
  }
}

export { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory }