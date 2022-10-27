const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    profile: {
        username: {
            type: String,
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        birthday: {
            type: String
        },
        friends: {
            incomeRequests:[{
                type: Schema.Types.ObjectId,
                ref: 'users'
            }],
            outcomeRequests:[{
                type: Schema.Types.ObjectId,
                ref: 'users'

            }],
            friends: [{
                type: Schema.Types.ObjectId,
                ref: 'users'
            }]
        },
        platforms: [
            {type: Schema.Types.ObjectId, ref: 'Platform'}
        ],
        games: [
            {type: Schema.Types.ObjectId, ref: 'Game'}
        ],
        genres: [
            {type: Schema.Types.ObjectId, ref: 'Genre'}
        ],
        isComplete: {
            type: Boolean,
            default: false
        }
    }
})

module.exports = model('User', UserSchema)