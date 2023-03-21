const jwt = require('jsonwebtoken');
const config = require("../config/config")

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: 'Access denied. No token provied!'
        });
    }
    
    try {
        jwt.verify(token, config.app.tokenSecret, (err, user) => {        
            if (err) {
                return res.status(403).json({
                    ok: false,
                    error: err
                })
            }
    
            req.user = user;    
            next();
          })
    } catch(error) {
        return res.status(401).json({
            ok: false,
            error: 'Token expired'
        });
    }
}