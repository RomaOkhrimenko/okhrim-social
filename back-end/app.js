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
    origin: '*'
}))

const userRoute = require('./routes/user.route')
app.use('/api', userRoute)

app.use(errorMiddleware)

module.exports = app