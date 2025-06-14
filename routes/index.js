const authRouter = require("./authRoutes")
const favouriteRouter = require("./favoriteRoutes")
const watchlistRouter = require("./watchlistRoutes")

const routes = [
  authRouter,
  favouriteRouter,
  watchlistRouter
]

module.exports = routes