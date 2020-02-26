// Härifrån startar vi upp vår webshop
const mongoose = require('mongoose')
const databaseURL = process.env.MONGO_ATLAS_URL
const { app, port } = require('./src/server')


// Kicka igång servern
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }

mongoose.connect(databaseURL, dbOptions).then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})

module.exports = { app, port }