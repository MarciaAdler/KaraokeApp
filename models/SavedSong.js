const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const SavedSong = sequelize.define("SavedSong", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "Songs",
        key: "id",
      },
    },
  });
  return SavedSong;
};
