const jwt = require('jsonwebtoken');
const config = require("../config/config")

exports.login = (req, res, next) => {
    try {
        const token = generateAccessToken(req.body.username);
        res.json({
            username: req.body.username,
            token: token
        });
    } catch (err) {
        next(err);
    }
};

function generateAccessToken(id) {
    return jwt.sign({id: id}, config.app.tokenSecret, { expiresIn: '7d' });
}
