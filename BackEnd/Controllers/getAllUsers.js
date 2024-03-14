const Users = require("../Models/Users");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.status(200).json(allUsers);
    } catch (err) {
        console.error("Error getting all users:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllUsers };
