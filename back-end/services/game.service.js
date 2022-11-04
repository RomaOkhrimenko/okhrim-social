const GameModel = require('../models/game.model')
const ApiFeatures = require('../utils/api-features')
const ApiError = require('../exception/api.error')

class GameService {
    async createGame(body) {
        return GameModel.create(body);
    }

    async getGames(query) {
        const apiFeatures = new ApiFeatures(GameModel.find(), query).search().filter()

        return await apiFeatures.query
    }

    async getSingleGame(id) {
        const game = await GameModel.findById(id)
            .populate({path: 'genres', model: 'Genre'})

        if (!game) {
            throw ApiError.BadRequest('Game not found')
        }

        return game
    }
}

module.exports = new GameService()