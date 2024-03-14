const Users = require("../Models/Users");
const deleteUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if the user exists
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await Users.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(`Error deleting user with ID ${userId}:`, err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { deleteUserById };
