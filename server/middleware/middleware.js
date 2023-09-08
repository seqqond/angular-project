const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../configs/config');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided.');
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token.');
        }

        req.userId = decoded.id
        next();
    });
}

module.exports = {authMiddleware}