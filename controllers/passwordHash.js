module.exports = {
  hashPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  comparePassword: function(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
};