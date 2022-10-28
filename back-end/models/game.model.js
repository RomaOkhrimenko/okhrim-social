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
    },
    genres: [
        {type: Schema.Types.ObjectId, ref: "Genre"}
    ]
})

module.exports = model('Game', GameSchema)