import AuthService from '../services/authService.js';

const authService = new AuthService();

export default function login(req, res, next) {
  try {
    const result = authService.login(req.body.username);
    return res.json(result);
  } catch (err) {
    console.err(err);
    return next(err);
  }
}
