const {Schema, model} = require('mongoose')

const GameSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String
    },
    slug: {
        type: String
    }
})

module.exports = model('Game', GameSchema)