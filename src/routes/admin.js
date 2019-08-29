const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AdminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');

// Create a new Admin
// Signup localhost:300/admin
router.post('/admin/signup', (req, res, next) => {
    AdminModel.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if(admin >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(!req.body) {
                        return res.status(400).send('Request body is missing')
                    } else {
                    const model = new AdminModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
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
            }
        })
})
//Admin Login
router.post("/admin/login", (req, res, next) => {
    AdminModel.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if(admin.length < 1 ) {
                return res.status(401).json({
                    message: "Auth failed!"
                })
            }
            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: admin[0].email,
                        userId: admin[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    },
                    )
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })
        }) 
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// Delete Admin User
router.delete("/admin/:userId", (req, res, next) => {
    AdminModel.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Admin account deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router
