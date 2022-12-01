const MessageService = require('../services/message.service')

class MessageController {
    async addMessage(req, res, next) {
        try {
            await MessageService.addMessage(req.body)

            return res.json({message: 'add message successfully'})
        } catch (e) {
            next(e)
        }
    }

    async getAllMessages(req, res, next) {
        try {
            const data = await MessageService.getAllMessages(req.body)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async resetMessages(req, res, next) {
        try {
            const data = await MessageService.resetMessages(req.params.id, req.body.roomId)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MessageController()