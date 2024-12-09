const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user.isSpeaker !== role) return res.status(403).send('Forbidden');
    next();
  };
};

module.exports = roleMiddleware;
