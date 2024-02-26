const Users = require("../Models/Users");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { firstName, lastName, birthday, phoneNumber, email, password, accountImage, roles } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Check for duplicate email in the database
        const duplicateUser = await Users.findOne({ email });
        if (duplicateUser) {
            return res.status(409).json({ message: "Email Is Already Registred" }); // Conflict
        }        

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Store the new user
        const newUser = {
            firstName,
            lastName,
            birthday,
            phoneNumber,
            email,
            password: hashedPwd,
            accountImage,
            roles,
        };

        const createdUser = await Users.create(newUser);

        console.log(createdUser);

        res.status(201).json({ success: `New user ${email} created!` });
    } catch (err) {
        console.error("Error creating new user:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleNewUser };
