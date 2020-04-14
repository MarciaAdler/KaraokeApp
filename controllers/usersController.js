const db = require("../models");

module.exports = {
  createUser: function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findOne: function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    }).then(function (user) {
      res.json(user);
    });
  },
  saveSong: function (req, res) {
    db.SavedSong.create({
      userId: req.body.userId,
      songId: req.body.songId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findAllSaved: function (req, res) {
    db.SavedSong.findAll({
      where: {
        userId: req.user.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findSavedById: function (req, res) {
    db.Song.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteById: function (req, res) {
    db.SavedSong.destroy({
      where: {
        songId: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
