const Booking = require('../models/Booking');
const Speaker = require('../models/Speaker');
const nodemailer = require('nodemailer');
require('dotenv').config();

const bookSession = async (req, res) => {
  const { speakerId, slotTime } = req.body;

  try {
    // Check if slot is available
    const speaker = await Speaker.findByPk(speakerId);
    if (!speaker) return res.status(404).send('Speaker not found');

    const availableSlots = speaker.availableSlots || [];
    if (!availableSlots.includes(slotTime))
      return res.status(400).send('Slot not available');

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      speakerId,
      slotTime,
    });

    // Remove slot from availability
    const updatedSlots = availableSlots.filter((slot) => slot !== slotTime);
    await speaker.update({ availableSlots: updatedSlots });

    // Send email notification
    sendEmail(req.user.email, speakerId, slotTime);

    res.status(201).send(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const sendEmail = (userEmail, speakerId, slotTime) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Booking Confirmation',
    text: `Your session with speaker ID ${speakerId} at ${slotTime} has been successfully booked.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error('Email error:', error);
    else console.log('Email sent:', info.response);
  });
};

module.exports = { bookSession };
