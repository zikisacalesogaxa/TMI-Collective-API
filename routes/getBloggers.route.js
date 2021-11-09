const express = require('express');
const router = express.Router();

const _admin = require('../models/admin.model');

router.get('/', (req, res) => {
    _admin.find({}, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving bloggers."
            });
        } else {
            res.send(data);
        }
    });
});

module.express = router;