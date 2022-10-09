const mongoose = require('mongoose')

const connectDatabase = async () => {
    await mongoose.connect(`mongodb+srv://social:tgrf7531@cluster0.ilgte6d.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('mongoose connect')
        })
}

module.exports = connectDatabase