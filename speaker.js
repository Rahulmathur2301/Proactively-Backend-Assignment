const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Speaker = sequelize.define('Speaker', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  expertise: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  availableSlots: { type: DataTypes.JSON }, // Store as JSON for simplicity
});

module.exports = Speaker;
