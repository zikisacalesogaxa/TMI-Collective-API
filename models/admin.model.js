// user.model.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  blogs: {
    type: Array,
    default: []
  }
});

var admin = mongoose.model('admin', adminSchema);

module.exports = admin;