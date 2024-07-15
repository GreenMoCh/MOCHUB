const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }

        req.user = decode;
        next();
    });
};
