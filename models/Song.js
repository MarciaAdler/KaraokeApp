const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Song = sequelize.define(
    "Song",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      artist: Sequelize.STRING,
      year: Sequelize.INTEGER,
      duo: Sequelize.INTEGER,
      explicit: Sequelize.INTEGER,
      date_added: Sequelize.DATE,
      styles: Sequelize.STRING,
      languages: Sequelize.STRING,
    },
    {}
  );
  Song.associate = function (models) {
    Song.belongsToMany(models.User, {
      through: "SavedSong",
      as: "Song",
      foreignKey: "songId",
    });
  };

  return Song;
};
