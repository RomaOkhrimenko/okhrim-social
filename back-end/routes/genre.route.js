const Router = require('express').Router
const GenresController = require('../controllers/genres.controller')


const router = new Router()

router.post('/genre', GenresController.createGenre)
router.get('/genres', GenresController.getGenres)

module.exports = router