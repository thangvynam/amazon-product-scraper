import { verify } from 'jsonwebtoken';
import config from '../config/config.js';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: 'Access denied. No token provied!',
    });
  }

  try {
    return verify(token, config.app.tokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          ok: false,
          error: err,
        });
      }

      req.user = user;
      return next();
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: 'Token expired',
    });
  }
};
