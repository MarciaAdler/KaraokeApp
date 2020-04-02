const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define("Song", {
    song_id: Sequelize.INTEGER,
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    year: Sequelize.INTEGER,
    duo: Sequelize.INTEGER,
    styles: Sequelize.STRING,
    explicit: Sequelize.INTEGER
  });

  return Song;
};