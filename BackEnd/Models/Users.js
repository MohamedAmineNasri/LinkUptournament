const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
        {
            firstName: {
            type: String,
            required: true,
            },
            lastName: {
            type: String,
            required: true,
            },
            birthday: {
            type: Date,
            },
            phoneNumber: {
            type: String,
            },
            email: {
            type: String,
            required: true,
            },
            password: {
            type: String,
            required: true,
            },
            accountImage: {
            type: String,
            },
            roles: {
            type: [String],
            enum: [
                "Admin",
                "Agent",
                "Manager",
                "Player",
                "TournamentCoordinator",
                "Supporter",
            ],
            default: "Supporter",
            },
            refreshToken: [String],
        },
        {
            timestamps: true,
        }
    );

module.exports = mongoose.model("Users", usersSchema);
