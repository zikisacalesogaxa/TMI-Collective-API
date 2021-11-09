// delete blog route
const express = require('express');
const router = express.Router();

const _blogs = require('../models/blogs.model');

router.delete('/:id', (req, res) => {
    _blogs.deleteBlog(req.params.id)
        .then(() => {
            res.status(200).json({
                message: 'Blog deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;