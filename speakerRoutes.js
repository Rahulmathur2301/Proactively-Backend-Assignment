const express = require('express');
const { setupProfile, listSpeakers } = require('../controllers/speakerController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/profile', authMiddleware, roleMiddleware(true), setupProfile);
router.get('/', authMiddleware, listSpeakers);

module.exports = router;
