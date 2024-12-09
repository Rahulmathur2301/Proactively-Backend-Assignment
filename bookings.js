const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Booking = sequelize.define('Booking', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  speakerId: { type: DataTypes.INTEGER, allowNull: false },
  slotTime: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'confirmed' },
});

module.exports = Booking;
