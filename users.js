const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isSpeaker: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
