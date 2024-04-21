require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const Player = require("../Models/Player");

mongoose.connect(process.env.DATABASE);

const generateFakePlayer = () => {
    // Define a list of short position codes
    const positions = ["RCB", "MDF", "ST", "GK", "RB", "LB", "CM", "LW", "RW"];

    // Generate a new Player document with random data
    const player = new Player({
        name: faker.person.firstName(),
        number: faker.number.int({ min: 1, max: 99 }),
        age: faker.number.int({ min: 1, max: 99 }),
        legal_guardian: faker.person.firstName(),
        academic_membership: faker.company.name(),
        position: faker.helpers.arrayElement(positions), // Choose a random position from the list
        skills: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
        ],
    });
    return player;
};

const seedDatabase = async () => {
    try {
        // Generate and save 30 fake players
        for (let i = 0; i < 30; i++) {
            const fakePlayer = generateFakePlayer();
            await fakePlayer.save();
        }
        console.log("30 fake players saved to the database.");
    } catch (error) {
        console.error("Error saving players to the database:", error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

seedDatabase();
