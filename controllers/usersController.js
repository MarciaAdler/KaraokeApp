const db = require("../models");

module.exports = {
  createUser: function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.json(req.body);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  },
  findOne: function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function(user) {
      res.json(user);
    });
  }
};
