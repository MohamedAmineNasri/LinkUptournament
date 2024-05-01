const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    newsTitle: {
        type: String,
        required: true,
    },
    article : {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("News", newsSchema);
