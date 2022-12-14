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

    async getGames(req, res, next) {
        try {
            const genres = await GameService.getGames(req.query)

            return res.json(genres)
        } catch (e) {
            next(e)
        }
    }

    async getSingleGame(req, res, next) {
        try {
            const game = await GameService.getSingleGame(req.params.id)

            return res.json(game)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GameController()