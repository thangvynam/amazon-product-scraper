const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateAccessToken(id) {
  return jwt.sign({ id }, config.app.tokenSecret, { expiresIn: '7d' });
}

exports.login = (req, res, next) => {
  try {
    const token = generateAccessToken(req.body.username);
    res.json({
      username: req.body.username,
      token,
    });
  } catch (err) {
    next(err);
  }
};
