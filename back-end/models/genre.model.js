const {Schema, model} = require('mongoose')

const GenreSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model('Genre', GenreSchema)