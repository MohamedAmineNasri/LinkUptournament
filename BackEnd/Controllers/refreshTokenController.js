const mongoose = require('mongoose')
const Users = mongoose.model('Users')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const decodedRef = jwt.decode(refreshToken);
    const foundUser = await Users.findOne({ email: decodedRef.email });
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: foundUser._id,
                        email: foundUser.email,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        roles: roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' } //for test change it to 15s
            );

            res.json({ accessToken, roles});
        }
    );
}

module.exports = { handleRefreshToken };    