import userModel from "../models/user.model.js"
import { fetchFromTMDB } from "../services/tmdb.service.js"



const searchPerson = async (req, res) => {
    const { query } = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (response.results.length === 0) {
            return res.status(404).send(null)
        }

        await userModel.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                  id: response.results[0].id,
                  image: response.results[0].profile_path,
                  title: response.results[0].name,
                  searchType: "person",
                  createdAt: new Date()
                }
            }
        })

        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in the searchPerson function: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const searchMovie = async (req, res) => {
  const { query } = req.params  
  try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

    if (response.results.length === 0) {
        return res.status(404).send(null)
    }

    const user = await userModel.findById(req.user._id);

    // Check if movie with the same ID already exists in searchHistory
    const exists = user.searchHistory.some(
      (entry) => entry.id === response.results[0].id
    );
    
    if (!exists) {
      await userModel.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: "movie",
            createdAt: new Date()
          }
        }
      });
    }
    

    res.status(200).json({ success: true, content: response.results })

  } catch (error) {
    console.log("Error in the searchMovie function: ", error.message)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
const searchTv = async (req, res) => {
  const { query } = req.params  
  try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

    if (response.results.length === 0) {
        return res.status(404).send(null)
    }

    await userModel.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
              id: response.results[0].id,
              image: response.results[0].poster_path,
              title: response.results[0].name,
              searchType: "tv",
              createdAt: new Date()
            }
        }
    })

    res.status(200).json({ success: true, content: response.results })

  } catch (error) {
    console.log("Error in the searchTv function: ", error.message)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

const getSearchHistory = async (req, res) => {
    try {

        res.status(200).json({ success: true, content: req.user.searchHistory })

    } catch (error) {
        console.log("Error in the getSearchHistory function: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


const removeItemFromSearchHistory = async (req, res) => {
    const { id } = req.params
    try {

        await userModel.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: Number(id) }
            }
        })
        
        res.status(200).json({ success: true, message: `Search item with the id ${id} has been deleted successfully` })

    } catch (error) {
        console.log("Error in the removeItemFromSearchHistory function: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}




export { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory }