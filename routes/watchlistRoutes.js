const express = require("express")
const { authorization, adminAuthorization } = require("../middlewares/auth")
const { addToWatchlist, getWatchlist, removeFromWatchlist } = require("../controllers/watchlist")

const watchlistRouter = express.Router()

//AUTHENTICATION
//SIGNUP
watchlistRouter.post('/watchlist', authorization, addToWatchlist)

watchlistRouter.get("/watchlist", authorization, getWatchlist)

watchlistRouter.delete('/watchlist/:movieId', authorization, removeFromWatchlist);

module.exports = watchlistRouter