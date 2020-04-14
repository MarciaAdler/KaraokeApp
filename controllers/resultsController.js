const Sequelize = require("sequelize");
const db = require("../models");
const Op = Sequelize.Op;
module.exports = {
  findAll: function (req, res) {
    db.Song.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.params.title + "%",
        },
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOne: function (req, res) {
    const queryArray = req.params.query.split("&&");
    const titleArray = queryArray[0].split("=");
    const artistArray = queryArray[1].split("=");
    const titleVar = titleArray[1].replace(/%20/g, " ");
    const artistVar = artistArray[1].replace(/%20/g, " ");

    db.Song.findOne({
      where: {
        title: titleVar,
        artist: artistVar,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
