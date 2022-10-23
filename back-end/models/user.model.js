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
        description: {
            type: String
        },
        birthday: {
            type: String
        },
        friends: [],
        platforms: [
            {type: Schema.Types.ObjectId, ref: 'Platform'}
        ],
        games: [
            {
                image: {
                    type: String,
                },
                name: {
                    type: String
                },
                slug: {
                    type: String
                }
            }
        ],
        genres: [],
        isComplete: {
            type: Boolean,
            default: false
        }
    }
})

module.exports = model('User', UserSchema)