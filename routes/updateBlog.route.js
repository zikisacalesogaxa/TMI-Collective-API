// update blog
const express = require('express');
const router = express.Router();

const _blogs = require('../models/blogs.model');

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    _blogs.findByIdAndUpdate(id, { title, content }, (err, blog) => {
        if (err) {
            res.status(500).json({
                message: 'Error updating blog',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Blog updated successfully',
                blog: blog
            });
        }
    });
});

module.exports = router;