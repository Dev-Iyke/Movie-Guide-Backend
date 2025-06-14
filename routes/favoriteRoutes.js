const express = require("express")
const { authorization, adminAuthorization } = require("../middlewares/auth")
const { addToFavorites, getFavorites, removeFromFavorites } = require("../controllers/favorite")

const favoriteRouter = express.Router()
//FAVORITES
// Add a movie to favorites
favoriteRouter.post('/favorites', authorization, addToFavorites)

// Get all favorites for a user
favoriteRouter.get("/favorites", authorization, getFavorites)

favoriteRouter.delete('/favorites/:movieId', authorization, removeFromFavorites);

module.exports = favoriteRouter