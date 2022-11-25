const {Schema, model} = require('mongoose')

const messageSchemas = new Schema({
        content: String,
        from: Object,
        socketId: String,
        time: String,
        date: String,
        to: String
    })
const Message = model('Message', messageSchemas)
module.exports = Message