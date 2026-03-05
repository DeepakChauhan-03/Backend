const express = require('express')
const authRouter = express.Router()
//auth controller
const authController = require('../controllers/auth.controller')
//auth middleware
const authMiddleware = require('../middleware/auth.middleware')


authRouter.post('/register',authController.registerUserController)

authRouter.post('/login',authController.loginUserController)

authRouter.get('/logout',authController.logoutUserController)

authRouter.get('/get-me',authMiddleware.authUser, authController.getMeController)


module.exports = authRouter