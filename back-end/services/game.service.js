const GameModel = require('../models/game.model')

class GameService {
    async createGame(body) {
        return GameModel.create(body);
    }

    async getGames() {
        return GameModel.find()
    }
}

module.exports = new GameService()