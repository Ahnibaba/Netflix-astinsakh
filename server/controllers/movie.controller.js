import { fetchFromTMDB } from "../services/tmdb.service.js"



const getTrendingMovie = async(req, res) => {
   try {
     const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
     const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

     res.json({ success: true, content: randomMovie })
   } catch (error) {
     console.log("Error in the getTrendingMovie function: ", error.message)
     res.status(500).json({ success: false, message: "Internal Server Error" })
     
   }
} 

const getMovieTrailers = async(req, res) => {
    const { id } = req.params 
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
      res.json({ success: true, trailers: data.results })
    } catch (error) {
      if(error.message.includes("404")) {
        return res.status(404).send(null)
      }  
      console.log("Error in the getMovieTrailers function: ", error.message)
      res.status(500).json({ success: false, message: "Internal Server Error" }) 
    }
}

const getMovieDetails = async(req, res) => {
    const { id } = req.params
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)  
      res.status(200).json({ success: true, content: data })
    } catch (error) {
        console.log("Error in the getMovieDetails function: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })   
    }
}

const getSimilarMovies = async(req, res) => {
  
  const { id } = req.params
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, similar: data.results })
} catch (error) {
    console.log("Error in the getSimilarMovies function: ", error.message)
    res.status(500).json({ success: false, message: "Internal Server Error" })   
  }
} 

const getMoviesByCategory = async(req, res) => {
  const { category } = req.params  
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    console.log("Error in the getMoviesByCategory function: ", error.message)
    res.status(500).json({ success: false, message: "Internal Server Error" })   
  }
}

export { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory }