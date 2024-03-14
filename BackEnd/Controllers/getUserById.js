const Users = require("../Models/Users");
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(`Error getting user by ID ${userId}:`, err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { getUserById };
