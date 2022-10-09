const app = require('./app')
const connectDataBase = require('./config/database')

connectDataBase()

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`)
})

