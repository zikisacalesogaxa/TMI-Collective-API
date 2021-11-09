// get all blogs
const express = require('express');
const router = express.Router();

const _blogs = require('../models/blogs.model');

router.get('/', (req, res) => {
    _blogs.find({}, (err, blogs) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send({
                blogs
            });
        }
    });
});

module.exports = router;