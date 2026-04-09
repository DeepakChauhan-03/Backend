const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes')

//routes
app.use('/api/auth',authRoutes)



module.exports = app;