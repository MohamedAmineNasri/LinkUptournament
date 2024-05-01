const News = require("../models/News");

// Create a new news
const createNews = async (req, res) => {
    try {
        const { newsTitle, image, author,article } = req.body;
        const news = new News({ newsTitle, image, author,article  });
        const savedNews = await news.save();
        res.status(201).json(savedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all news
const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single news by ID
const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ message: "News not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a news by ID
const updateNewsById = async (req, res) => {
    try {
        const { newsTitle, image } = req.body;
        const news = await News.findById(req.params.id);
        if (news) {
            news.newsTitle = newsTitle;
            news.image = image;
            const updatedNews = await news.save();
            res.json(updatedNews);
        } else {
            res.status(404).json({ message: "News not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a news by ID
const deleteNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news) {
            await news.remove();
            res.json({ message: "News deleted" });
        } else {
            res.status(404).json({ message: "News not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
};
