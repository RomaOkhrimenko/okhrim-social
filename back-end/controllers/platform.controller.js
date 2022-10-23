const PlatformService = require('../services/platform.service')

class PlatformController {
   async createPlatform(req, res, next) {
       try {
           const platform = await PlatformService.createPlatform(req.body)

           return res.json(platform)
       } catch (e) {
           next(e)
       }
   }

   async getPlatforms(req, res, next) {
       try {
           const platforms = await PlatformService.getPlatforms()

           return res.json(platforms)
       } catch (e) {
           next(e)
       }
   }
}

module.exports = new PlatformController()