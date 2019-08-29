const UserModel = require("../models/user.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Add User
router.post("/user/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(!req.body) {
            return res.status(400).send('Request bosy is missing')
        } else {
            const model = new UserModel ({
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
})

//Admin Login
router.post("/user/login", (req, res, next) => {
    UserModel.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if(user.length < 1 ) {
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
                        email: user[0].email,
                        userId: user[0]._id
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
router.delete("/user/:userId", (req, res, next) => {
    UserModel.remove({ _id: req.params.userId })
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

module.exports = router;
