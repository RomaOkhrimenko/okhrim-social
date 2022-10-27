const GenreModel = require('../models/genre.model')

class GenresService {
    async createGenre(body) {
        return GenreModel.create(body);
    }

    async getGenre() {
        return GenreModel.find()
    }
}

module.exports = new GenresService()