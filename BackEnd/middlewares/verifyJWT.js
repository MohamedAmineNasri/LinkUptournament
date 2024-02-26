const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }

            // Include additional user information in req.user and req.roles
            req.user = {
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                birthday: decoded.birthday,
                phoneNumber: decoded.phoneNumber,
            };

            req.roles = decoded.roles;

            next();
        }
    );
}

module.exports = verifyJWT;
