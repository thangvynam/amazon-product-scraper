const jwt = require('jsonwebtoken');

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
    return jwt.sign({id: id}, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}
