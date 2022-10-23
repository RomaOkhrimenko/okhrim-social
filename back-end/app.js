require("dotenv").config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

const userRoute = require('./routes/user.route')
const platformRoute = require('./routes/platform.route')

app.use('/api', userRoute)
app.use('/api', platformRoute)

app.use(errorMiddleware)

module.exports = app