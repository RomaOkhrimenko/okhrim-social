const app = require('./app')
const connectDataBase = require('./config/database')
const socket = require('socket.io')
const Message = require('./models/message.model')
const User = require('./models/user.model')


connectDataBase()

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

// app.get('/rooms', (req, res) => {
//     res.json(rooms)
// })

async function getLastMessagesFromRoom(room) {
    return Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ]);
}

function sortRoomMessagesByDate(messages) {
    return messages.sort(function(a, b) {
        let date1 = a._id.split('/')
        let date2 = b._id.split('/')

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1]

        return date1 < date2 ? -1 : 1
    })
}

io.on('connection', (socket) => {

    socket.on('new-user', async () => {
        const members = await User.find()
        io.emit('new-user', members)
    })

    socket.on('join-room', async (room) => {
        console.log(room)
        socket.join(room)
        let roomMessages = await getLastMessagesFromRoom(room)
        roomMessages = sortRoomMessagesByDate(roomMessages)
        socket.emit('room-messages', roomMessages)
    })

    socket.on('message-room', async(room, content, sender, time, date, friendId) => {
        await Message.create({content, from: sender, time, date, to: room});
        const friend = await User.findById(friendId)
        let roomMessages = await getLastMessagesFromRoom(room);
        if(friend?.status === 'offline') {
            friend.newMessages[room] = friend.newMessages[room] + 1;
            const newMessages = friend.newMessages
            await User.updateOne({_id: friendId}, {$set: {newMessages}})
        }

        roomMessages = sortRoomMessagesByDate(roomMessages);
        // sending message to room
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit('notifications', room)
    })
})

// global.ononlineUsers = new Map()
//
// io.on('connection', (socket) => {
//     global.chatSocket = socket
//     socket.on("add-user", (userId) => {
//         ononlineUsers.set(userId, socket.id)
//     })
//
//     socket.on('send-message', (data) => {
//         const sendUserSocket = ononlineUsers.get(data.to)
//         if(sendUserSocket) {
//             socket.to(sendUserSocket).emit('message-recieve', data.message)
//         }
//     })
// })

