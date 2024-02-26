const mongoose = require('mongoose')
const Users = mongoose.model('Users')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const foundUser = await Users.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid email or password." }); // Unauthorized
        }

        // Evaluate password
        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
            // Create JWTs with additional user information
            const accessToken = jwt.sign(
                {
                    email: foundUser.email,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    birthday: foundUser.birthday,
                    phoneNumber: foundUser.phoneNumber,
                    roles: foundUser.roles,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                { email: foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Save refreshToken with current user
            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            // Send tokens in response
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            res.status(401).json({ message: "Invalid email or password." }); // Unauthorized
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { handleLogin };
