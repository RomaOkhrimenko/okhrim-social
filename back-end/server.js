const app = require('./app')
const connectDataBase = require('./config/database')
const socket = require('socket.io')


connectDataBase()

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

global.ononlineUsers = new Map()

io.on('connection', (socket) => {
    global.chatSocket = socket
    socket.on("add-user", (userId) => {
        ononlineUsers.set(userId, socket.id)
    })

    socket.on('send-message', (data) => {
        const sendUserSocket = ononlineUsers.get(data.to)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('message-recieve', data.message)
        }
    })
})

