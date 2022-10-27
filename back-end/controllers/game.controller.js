const GameService = require('../services/game.service')

class GameController {
    async createGame(req, res, next) {
        try {
            const genre = await GameService.createGame(req.body)

            return res.json(genre)
        } catch (e) {
            next(e)
        }
    }

    async getGame(req, res, next) {
        try {
            const genres = await GameService.getGames()

            return res.json(genres)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GameController()