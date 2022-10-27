const {Schema, model} = require('mongoose')

const SettingsAccountSchema = new Schema({
    platforms: {
        type: Array,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    games: {
        type: Array,
        required: true,
    }
})

module.exports = model('SettingsAccount', SettingsAccountSchema)