const {Schema, model} = require('mongoose')

const PlatformSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

module.exports = model('Platform', PlatformSchema)