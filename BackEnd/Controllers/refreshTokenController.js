const mongoose = require('mongoose')
const Users = mongoose.model('Users')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const decodedref = jwt.decode(refreshToken);

    try {
        const foundUser = await Users.findOne({ email: decodedref.email });

        if (!foundUser) {
            const decoded = jwt.decode(refreshToken); 
            if (!decoded || !decoded.email) return res.sendStatus(403); 
            const hackedUser = await Users.findOne({ email: decoded.email });
            hackedUser.refreshToken = [];
            await hackedUser.save();
            return res.sendStatus(403); 
        }

        const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded || !decoded.email || foundUser.email !== decoded.email) {
            return res.sendStatus(403); 
        }

        foundUser.refreshToken = foundUser.refreshToken || [];

        const accessToken = jwt.sign(
            { email: decoded.email, firstName: foundUser.firstName, lastName: foundUser.lastName, roles: foundUser.roles, phoneNumber: foundUser.phoneNumber, birthday: foundUser.birthday },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const newRefreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = [...foundUser.refreshToken.filter(rt => rt !== refreshToken), newRefreshToken];
        await foundUser.save();

        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.json({ accessToken });
    } catch (error) {
        console.error("Error handling refresh token:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { handleRefreshToken };