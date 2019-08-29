let mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);

let FixtureSchema = new mongoose.Schema({
    firstteam: { type: String, required: true },
    second_team: { type: String, required: true   },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    link: { type: String, required: true },
    status: { type: String }
})

module.exports = mongoose.model('Fixture', FixtureSchema)