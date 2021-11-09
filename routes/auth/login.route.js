// login route
const express = require('express');
const router = express.Router();

// import bcrypt
const bcrypt = require('bcrypt');

const _admin = require('../../models/admin.model');

router.post('/', (req, res) => {
    // get the user input
    const { username, password } = req.body;

    // check if the user input is empty
    if (!username || !password) {
        return res.status(400).json({
            message: 'Please enter all fields'
        });
    }

    // check if the user exists
    _admin.findOne({ username: username })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: 'User does not exist'
                });
            }

            // check if the password is correct
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({
                            message: 'Incorrect password'
                        });
                    }

                    // return the user
                    res.json({
                        message: 'Login successful',
                        user: user
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Internal server error'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

module.exports = router;