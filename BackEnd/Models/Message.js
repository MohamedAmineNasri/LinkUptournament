const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatroom : {
        type: mongoose.Schema.Types.ObjectId,
        require: 'Chatroom is required !!',
        ref: 'Chatroom'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        require: 'User is required !!',
        ref: 'User'
    },
    message : {
        type: String,
        require: 'Message is required !!'
    }
}, { timestamps: true }); 

module.exports = mongoose.model("Message", messageSchema);
