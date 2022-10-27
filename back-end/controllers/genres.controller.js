const GenresService = require('../services/genres.service')

class GenresController {
    async createGenre(req, res, next) {
        try {
            const genre = await GenresService.createGenre(req.body)

            return res.json(genre)
        } catch (e) {
            next(e)
        }
    }

    async getGenres(req, res, next) {
        try {
            const genres = await GenresService.getGenre()

            return res.json(genres)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GenresController()