const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: Sequelize.STRING,
    // The password cannot be null
    password: Sequelize.STRING
  });

  return User;
};
