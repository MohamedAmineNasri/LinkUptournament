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
            const roles = Object.values(foundUser.roles).filter(Boolean);
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
                { expiresIn: '1d' }//for test put it to 15s
            );

            const refreshToken = jwt.sign(
                { email: foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            // Save refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);
            console.log(roles);
    

            // Send tokens and user info in response
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days, adjust as needed

            res.json({ accessToken,roles, user: {
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                birthday: foundUser.birthday,
                phoneNumber: foundUser.phoneNumber,
                roles: foundUser.roles,
            }});
        } else {
            res.status(401).json({ message: "Invalid email or password." }); // Unauthorized
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleLogin };
