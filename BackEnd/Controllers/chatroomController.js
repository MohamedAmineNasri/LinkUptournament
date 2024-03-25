const mongoose = require('mongoose')
const Chatroom = require("../Models/Chatroom");

exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const chatroom = new Chatroom({ name });

  await chatroom.save();

  res.json({
    message: "Chatroom created!!",
  });
};

exports.getAllChatroom = async (req, res) => {
  const chatrooms = await Chatroom.find({
  });
  res.json(chatrooms);
};
