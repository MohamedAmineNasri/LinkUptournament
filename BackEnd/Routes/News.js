const express = require("express");
const router = express.Router();
const {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
} = require("../controllers/newsController");

// Create a new news
router.post("/", createNews);

// Get all news
router.get("/", getAllNews);

// Get a single news by ID
router.get("/:id", getNewsById);

// Update a news by ID
router.put("/:id", updateNewsById);

// Delete a news by ID
router.delete("/:id", deleteNewsById);

module.exports = router;
