import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config.js';

function generateAccessToken(id) {
  return jsonwebtoken.sign({ id }, config.app.tokenSecret, { expiresIn: '7d' });
}

function validate(userName) {
  return config.app.userName.includes(userName);
}

export default function login(req, res, next) {
  try {
    const userName = req.body.username;
    if (!validate(userName)) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized',
      });
    }

    const token = generateAccessToken(req.body.username);
    return res.json({
      username: req.body.username,
      token,
    });
  } catch (err) {
    return next(err);
  }
}
