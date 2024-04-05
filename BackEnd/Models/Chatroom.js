const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    name : {
        type: String,
        require: 'Name is required!!'
    }
})

module.exports = mongoose.model("Chatroom", chatroomSchema);