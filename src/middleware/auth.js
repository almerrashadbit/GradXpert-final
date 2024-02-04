// middlewares/authenticate.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, "verSecretKey", (err, user) => {
    if (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
    });
}

module.exports = authenticate;
