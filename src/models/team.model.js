let mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);

let TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Team', TeamSchema)