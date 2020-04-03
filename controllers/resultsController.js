const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    console.log(req.params);
    db.Song.findAll({
      where: {
        title: req.params.title
      }
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
