import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config.js';

function generateAccessToken(id) {
  return jsonwebtoken.sign({ id }, config.app.tokenSecret, { expiresIn: '7d' });
}

export default function login(req, res, next) {
  try {
    const token = generateAccessToken(req.body.username);
    res.json({
      username: req.body.username,
      token,
    });
  } catch (err) {
    next(err);
  }
}
