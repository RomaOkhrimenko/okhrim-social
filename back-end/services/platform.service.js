const PlatformModel = require('../models/platform.model')

class PlatformService {
    async createPlatform(body) {
        return PlatformModel.create(body);
    }

    async getPlatforms() {
        return PlatformModel.find()
    }
}

module.exports = new PlatformService()