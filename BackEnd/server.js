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
