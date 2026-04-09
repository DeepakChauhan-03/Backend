const express = require('express')
const router = express.Router();
const authcontroller = require('../controllers/auth.controller')

/**
 * POST - /api/auth/register
 */
router.post('/register',authcontroller.registerUser)

/**
 * POST - /api/auth/login
 */
router.post('/login',authcontroller.loginUser);

/**
 * POST -/api/auth/logout
 */
router.post('/logout',authcontroller.logoutUser)

module.exports = router;