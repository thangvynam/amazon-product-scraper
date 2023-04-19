/* eslint-disable class-methods-use-this */
import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config.js';

class AuthService {
  generateAccessToken(id) {
    return jsonwebtoken.sign({ id }, config.app.tokenSecret, {
      expiresIn: '7d',
    });
  }

  validate = (userName) => config.app.userName.includes(userName);

  login(userName) {
    try {
      if (!this.validate(userName)) {
        return {
          ok: false,
          error: 'Unauthorized',
        };
      }

      const token = this.generateAccessToken(userName);
      return {
        username: userName,
        token,
      };
    } catch (err) {
      console.error(err);
      return {
        username: userName,
        error: err.message,
      };
    }
  }
}

export default AuthService;
