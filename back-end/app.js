require("dotenv").config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')
const path = require('path')

const app = express()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

const userRoute = require('./routes/user.route')
const platformRoute = require('./routes/platform.route')
const genreRoute = require('./routes/genre.route')
const gameRoute = require('./routes/game.route')
const settingsAccountRoute = require('./routes/settings-account.route')
const messageRoute = require('./routes/message.route')

app.use('/api', userRoute)
app.use('/api', platformRoute)
app.use('/api', genreRoute)
app.use('/api', gameRoute)
app.use('/api', settingsAccountRoute)
app.use('/api', messageRoute)

// app.use(express.static(path.join(__dirname, "../front-end/build")))
//
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../front-end/build/index.html"))
// })

app.use(errorMiddleware)

module.exports = app