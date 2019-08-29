const FixtureModel = require('../models/fixture.model')
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')


router.post('/fixture/create', checkAuth,  (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request bosy is missing')
    }
    //const _id = mongoose.Schema.Types.ObjectId;
    let fixture = new FixtureModel({
        firstteam: req.body.firstteam,
        second_team: req.body.second_team,
        date: req.body.date,
        time: req.body.time,
        link: req.body.firstteam + '-vs-'+ req.body.secondteam + '-' + req.body.date + '-' + req.body.time
    })
    fixture.save()
    .then(doc => {
        if(!doc || doc.lenght === 0) {
            return res.status(500).send(doc)
        }
        res.status(201).send(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })

})

// GET All
router.get('/fixture/view', (req, res) => {
    var resultArray = [];

    fixture.find()
    .then(doc => {
    res.json(doc)
    })
    .catch(err => {
    res.status(500).json(err)
    })
})

// GET by fixID
router.get('/fixture/find', checkAuth, (req, res) => {
    if(!req.query.fixID) {
    return res.status(400).send('Missing URL parameter: fixid')
}

FixtureModel.findOne({
    _id: req.query.fixID
})
    .then(doc => {
    res.json(doc)
    })
    .catch(err => {
    res.status(500).json(err)
    })
})

// UPDATE
router.put('/fixture/edit', checkAuth, (req, res) => {
if(!req.query.fixID) {
    return res.status(400).send('Missing URL parameter: fixid')
}

FixtureModel.findOneAndUpdate({
    _id: req.query.fixID
}, req.body, {
    new: true
})
    .then(doc => {
    res.json(doc)
    })
    .catch(err => {
    res.status(500).json(err)
    })
})
  
// DELETE
router.delete('/fixture/delete', checkAuth, (req, res) => {
if(!req.query.fixID) {
    return res.status(400).send('Missing URL parameter: fixid')
}

fixture.findOneAndRemove({
    _id: req.query.fixID
})
    .then(doc => {
    res.json(doc)
    })
    .catch(err => {
    res.status(500).json(err)
    })
})
  

module.exports = router
