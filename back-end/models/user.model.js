const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    prevUsers: {
        type: Array,
        default: []
    },
    newMessages: {
        type: Object,
        default: {}
    },
    status: {
        type: String
    },
    profile: {
        username: {
            type: String,
        },
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String
            }
        },
        description: {
            type: String
        },
        birthday: {
            type: String
        },
        friends: {
            incomeRequests: [{type: Schema.Types.ObjectId, ref: 'User'}],
            outcomeRequests: [{type: Schema.Types.ObjectId, ref: 'User'}],
            friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
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
        },
        gender: {
            type: String,
        }
    }
})

module.exports = model('User', UserSchema)