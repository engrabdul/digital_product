let mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);

let AdminSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
})

module.exports = mongoose.model('Admin', AdminSchema)