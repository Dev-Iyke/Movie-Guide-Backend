const express = require("express")
const { handleUserSignup, handleLogin, handleGetAllUsers, handleGetUser } = require("../controllers/auth")
const { authorization, adminAuthorization } = require("../middlewares/auth")

const authRouter = express.Router()

//AUTHENTICATION
//SIGNUP
authRouter.post('/auth/signup', handleUserSignup)

//LOGIN
authRouter.post("/auth/login", handleLogin)

authRouter.get("/auth/user", authorization, handleGetUser)
authRouter.get("/users", authorization, handleGetAllUsers)

module.exports = authRouter