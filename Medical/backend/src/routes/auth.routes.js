const express = require('express')
const authController = require('../controllers/auth.controller')
const isAuthenticated = require('../middlewares/auth.middleware')
const router = express.Router();


router.post('/register',authController.registerUser)

router.post('/login',authController.loginUser)

router.get('/getProfile',isAuthenticated,authController.fetchProfile)

module.exports = router;

