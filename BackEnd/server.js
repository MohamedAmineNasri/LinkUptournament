require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});



const app = require("./app");
const server = app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});


const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const Message = require("./Models/Message");
const User = require("./Models/Users.js");

io.on("connection", async (socket) => {
  console.log("connected:" + socket.id);

  socket.on("disconnect", () => {
    console.log("disconnect:" + socket.id);
  });

  // Handle join room event
  socket.on("joinRoom", ({ id }) => {
    socket.join(id);
    console.log("A user joined chatroom: " + id);
  });

  // Handle leave room event
  socket.on("leaveRoom", ({ id }) => {
    socket.leave(id);
    console.log("A user left chatroom: " + id);
  });

  // Handle chatroom message event
  socket.on("chatroomMessage", async ({ id, message }) => {
    if (message.trim().length > 0) {
      try {
        // Fetch user details from the database
        const foundUser = await User.findById(socket.userId);

        if (!foundUser) {
          console.log("User not found!");
          return;
        }

        // Create a new message object
        const newMessage = new Message({
          chatroom: id,
          user: socket.userId,
          message,
        });

        // Emit the new message to the chatroom
        io.to(id).emit("newMessage", {
          message,
          name: `${foundUser.firstName} ${foundUser.lastName}`,
          userId: socket.userId,
        });

        // Save the new message to the database
        await newMessage.save();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  });
});

