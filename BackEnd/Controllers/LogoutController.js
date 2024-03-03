const mongoose = require('mongoose')
const Users = mongoose.model('Users')

require('dotenv').config();


const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    try {
        const foundUser = await Users.findOne({ refreshToken });

        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        // Clear the refreshToken in the database
        foundUser.refreshToken = [];
        await foundUser.save();

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleLogout  };