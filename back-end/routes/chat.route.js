const Router = require('express').Router
const ChatController = require('../controllers/chat.controller')


const router = new Router()

router.get('/rooms', ChatController.getRooms)
// router.get('/', ChatController.getGames)
// router.get('/', ChatController.getSingleGame)

module.exports = router