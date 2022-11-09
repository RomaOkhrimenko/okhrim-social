const Router = require('express').Router
const MessageController = require('../controllers/message.controller')


const router = new Router()

router.post('/add-message', MessageController.addMessage)
router.post('/messages', MessageController.getAllMessages)

module.exports = router