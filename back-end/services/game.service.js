const GameModel = require('../models/game.model')
const ApiFeatures = require('../utils/api-features')

class GameService {
    async createGame(body) {
        return GameModel.create(body);
    }

    async getGames(query) {
        const apiFeatures =  new ApiFeatures(GameModel.find(), query).search().filter()

        return await apiFeatures.query
    }
}

module.exports = new GameService()