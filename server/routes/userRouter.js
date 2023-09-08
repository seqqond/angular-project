const express = require('express')
const userRouter = express.Router()
const {postUser, loginUser, getUsers} = require('../controller/userController')
const { authMiddleware } = require('../middleware/middleware')
const jsonParser = express.json()

userRouter.post('/register', jsonParser, postUser)
userRouter.post('/login', jsonParser, loginUser)
userRouter.get('/users', authMiddleware, getUsers)

module.exports = userRouter