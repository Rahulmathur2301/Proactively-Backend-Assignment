const Speaker = require('../models/Speaker');

const setupProfile = async (req, res) => {
  const { expertise, bio, availableSlots } = req.body;

  try {
    const speaker = await Speaker.create({
      userId: req.user.id,
      expertise,
      bio,
      availableSlots,
    });

    res.status(201).send(speaker);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const listSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.findAll();
    res.status(200).send(speakers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { setupProfile, listSpeakers };
