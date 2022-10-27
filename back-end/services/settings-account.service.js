const GameModel = require('../models/game.model')
const PlatformModel = require('../models/platform.model')
const GenreModel = require('../models/genre.model')
const SettingsAccountModel = require('../models/settings-account.model')

class GameService {
    async createSettingsAccountPage() {
        const platforms = await PlatformModel.find()
        const games = await GameModel.find()
        const genres = await GenreModel.find()
        return SettingsAccountModel.create({platforms, games, genres});
    }

    async getSettingsAccount() {
        return SettingsAccountModel.find()
    }
}

module.exports = new GameService()