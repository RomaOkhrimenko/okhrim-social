const Router = require('express').Router
const PlatformController = require('../controllers/platform.controller')


const router = new Router()

router.post('/platform', PlatformController.createPlatform)
router.get('/platforms', PlatformController.getPlatforms)

module.exports = router