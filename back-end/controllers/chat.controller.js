const ChatService = require('../services/chat.service')

class ChatController {
    async getRooms(req, res, next) {
        try {
            const rooms = await ChatService.getRooms()

            return res.json(rooms)
        } catch (e) {
            next(e)
        }
    }
    //
    // async getGames(req, res, next) {
    //     try {
    //         const genres = await ChatService.getGames(req.query)
    //
    //         return res.json(genres)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    //
    // async getSingleGame(req, res, next) {
    //     try {
    //         const game = await ChatService.getSingleGame(req.params.id)
    //
    //         return res.json(game)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
}

module.exports = new ChatController()