const MessageModel = require('../models/message.model')
const UserModel = require('../models/user.model')
const ApiError = require('../exception/api.error')

class MessageService {
    async addMessage(body) {
        const {from, to, message} = body
        const data = await MessageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from
        })

        return data
    }

    async getAllMessages(body) {
        const {from, to} = body
        const messages = await MessageModel.find({users: {$all: [from, to]}}).sort({updateAt: 1})

        return messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text
            }
        })
    }

    async resetMessages(_id, roomId) {
        const x = await UserModel.findById(_id)

        delete x.newMessages[roomId]

        return UserModel.findOneAndUpdate({_id}, {newMessages: x.newMessages});
    }
}

module.exports = new MessageService()