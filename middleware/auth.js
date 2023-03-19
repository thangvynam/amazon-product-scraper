const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader;

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: 'Access denied. No token provied!'
        });
    }
    
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {        
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