import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: 'Access denied. No token provided!',
    });
  }

  try {
    const user = jwt.verify(token, config.app.tokenSecret);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: 'Token expired or invalid',
    });
  }
};
