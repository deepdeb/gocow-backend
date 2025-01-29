const jwt = require('jsonwebtoken')
const { jwt_config } = require('../../config/vars');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log(token)
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    jwt.verify(token.replace('Bearer', ''), jwt_config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err });
        }

        req.admin = decoded;
        next();
    });
};

module.exports = authenticateToken;