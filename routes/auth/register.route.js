// register route
const express = require('express');
const router = express.Router();

// import bcrypt
const bcrypt = require('bcrypt');

const _admin = require('../../models/admin.model');

router.post('/', (req, res) => {
    // get the data from the request
    const { username, password } = req.body;

    // hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // check if username exists
    _admin.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error'
            });
        } else if (user) {
            res.status(400).json({
                message: 'Username already exists'
            });
        } else {
            // create a new user
            const newUser = new _admin({
                username: username,
                password: hashedPassword
            });

            // save the user
            newUser.save((err, user) => {
                if (err) {
                    res.status(500).json({
                        message: 'Internal server error'
                    });
                } else {
                    res.status(201).json({
                        message: 'User created successfully'
                    });
                }
            });
        }
    });
});

module.exports = router;