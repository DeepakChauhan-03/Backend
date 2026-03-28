const express = require('express')
const authController = require('../controllers/auth.controller')
const authRouter = express.Router();


/**
 * POST - /api/auth/register
 */
authRouter.post('/register',authController.register)

/**
 * GET - /api/auth/get-me
 */
 authRouter.get('get-me',authController.getMe)


module.exports = authRouter;