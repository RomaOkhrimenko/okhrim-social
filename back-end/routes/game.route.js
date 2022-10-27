const Router = require('express').Router
const GamesController = require('../controllers/game.controller')


const router = new Router()

router.post('/game', GamesController.createGame)
router.get('/games', GamesController.getGame)

module.exports = router