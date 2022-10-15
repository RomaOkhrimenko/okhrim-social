const mongoose = require('mongoose')

const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('mongoose connect')
        })
}

module.exports = connectDatabase