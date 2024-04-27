require("dotenv").config();

const http = require("http");



const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});


mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});



const app = require("./app");

// Create HTTP server using the app
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Running");
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
  socket.emit("me", socket.id);
  console.log("connected:" + socket.id);
  console.log("User ID:", socket.handshake.query.userId);
  // Store the user ID in the socket for later use
  socket.userId = socket.handshake.query.userId;

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
        // Fetch user details from the database using the stored userId
        const foundUser = await User.findById(socket.userId);

        if (!foundUser) {
          console.log("User not found for ID:", socket.userId);
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

  // Handle callUser event
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  // Handle answerCall event
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  })
  
  

});
module.exports = mongoose.connection;