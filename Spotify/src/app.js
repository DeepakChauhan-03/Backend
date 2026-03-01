const express = require('express')
const app = express();
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const cookieParser = require('cookie-parser')


dotenv.config();

connectToDB();

//middlewares
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)

module.exports = app;