// create new blog all blogs
const express = require('express');
const router = express.Router();

const _blogs = require('../models/blogs.model');
const _admin = require('../models/admin.model');

router.post('/', (req, res) => {
    const blog = new _blogs({
        title: req.body.title,
        description: req.body,
        author: req.body.author,
    });

    blog.save().then(() => {
        // add new blog to admin
        _admin.findOneAndUpdate({}, { $push: { blogs: blog._id } }, { new: true }).then(() => {
            res.json({
                success: true,
                message: 'Blog created successfully',
            });
        });
    }).catch((err) => {
        res.send(err);
    });
    
});

module.exports = router;
