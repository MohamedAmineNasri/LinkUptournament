const Users = require("../Models/Users");
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        // Check if the user exists
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user
        await Users.findByIdAndUpdate(userId, updatedUserData);
        
        // Fetch the updated user data
        const updatedUser = await Users.findById(userId);

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error(`Error updating user with ID ${userId}:`, err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { updateUserById };
