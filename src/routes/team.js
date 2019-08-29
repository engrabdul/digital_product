const express = require('express');
const router = express.Router();
const TeamModel = require('../models/team.model');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


// Add New Team
router.post('/team/create', checkAuth, (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request bosy is missing')
    } else {
    const model = new TeamModel({
    name: req.body.name,
    slug: req.body.slug
    })
    model.save()
    .then(doc => {
        if(!doc || doc.lenght === 0) {
            return res.status(500).send(doc)
        }
        res.status(201).send(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    }
})

// GET
router.get('/team/find', checkAuth, (req, res) => {
    if(!req.query.teamId) {
    return res.status(400).send('Missing URL parameter: TeamID')
}

//GET Specific Team
TeamModel.findOne({
    _id: req.query.teamId
})
    .then(doc => {
    res.json(doc)
    })
    .catch(err => {
    res.status(500).json(err)
    })
})

// All
router.get('/team/view', checkAuth, (req, res) => {
        var resultArray = [];

        TeamModel.find()
        .then(doc => {
        res.json(doc)
        })
        .catch(err => {
        res.status(500).json(err)
        })
    
})


// UPDATE
router.put('/team/edit', checkAuth, (req, res) => {
if(!req.query.teamId) {
    return res.status(400).send('Missing URL parameter: teamId')
}

TeamModel.findOneAndUpdate({
    _id: req.query.teamId
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
router.delete('/team/delete', checkAuth, (req, res) => {
if(!req.query.teamId) {
    return res.status(400).send('Missing URL parameter: teamId')
}

TeamModel.findOneAndRemove({
    _id: req.query.teamId
})
    .then(doc => {
    res.json(doc)
    })
    .catch(err => {
    res.status(500).json(err)
    })
})
  

module.exports = router
