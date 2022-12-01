const Router = require('express').Router
const MessageController = require('../controllers/message.controller')


const router = new Router()

router.post('/add-message', MessageController.addMessage)
router.post('/messages', MessageController.getAllMessages)
router.post('/reset-messages/:id', MessageController.resetMessages)

module.exports = router