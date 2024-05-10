const express = require("express");
const cors = require("cors");
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
//-

var AcademyRouter = require("./Routes/Academy");
var TeamRouter = require("./Routes/Team");
const groupRoutes = require("./Routes/Group");
const staduimRoutes = require("./Routes/Staduim");
const tournamentRoutes = require("./Routes/Tournament");
const tournRouter = require("./Routes/tournRouter");
const match = require("./Routes/match");

var AchievementRouter = require("./Routes/Achievement");
var TachievementRouter = require("./Routes/tachievement");

const m = require("./Models/match");
const u = require("./Controllers/registerController");
const app = express();

const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
// const tournementRouter = require("./Routes/tournementRouter");
const playerRouter = require("./Routes/playerRouter");
const refereeRouter = require("./Routes/refereeRouter");
const chatroomRouter = require("./Routes/chatroom");
const bracketStageRouter = require("./routes/BracketStageRouter");
const webrtc = require("wrtc");
const bodyParser = require("body-parser");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const GridFSBucket = require("mongodb").GridFSBucket;
const MongoClient = require("mongodb").MongoClient;

//YASSINE
require("dotenv").config();
const url = process.env.DATABASE;
const mongoClient = new MongoClient(url);
//YASSINE

//YASSINE
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
        metadata: {
          // Set additional metadata if needed
          // For example, you can add a timestamp
          timestamp: Date.now(),
        },
      };
    } else {
      //Otherwise save to default bucket
      return `${Date.now()}_${file.originalname}`;
    }
  },
});

const upload = multer({ storage });

//YASSINE

// app.use(cors());
// app.use(express.json());

const cookieParser = require("cookie-parser");

// i added the {limit: '50mb'} so i can upolad files larger than 100kb
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// app.use("/tournement", tournementRouter);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

// app.use(credentials);

// Cross Origin Resource Sharing
//  app.use(cors(corsOptions));
// app.use("/tournement", tournementRouter);
// app.use("/team", teamRouter);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);
// app.use(cors(corsOptions));
// Cross Origin Resource Sharing

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlleware for cookies
app.use(cookieParser());

// Bring in the models
require("./Models/Users");
require("./Models/Chatroom");

// Bring in the routes :

// Users Route :
app.use("/user", require("./Routes/user"));
app.use("/news", require("./Routes/News"));
app.use("/chatroom", require("./Routes/chatroom"));

//YASSINE
app.post("/upload/image", upload.single("avatar"), (req, res) => {
  const file = req.file;
  // Respond with the file details
  res.send({
    message: "Uploaded",
    id: file.id,
    name: file.filename,
    contentType: file.contentType,
    imageUrl: `${req.protocol}://${req.get("host")}/download/${file.filename}`,
  });
});

app.get("/images", async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db("LinkUptournament");
    const images = database.collection("photos.files");
    const cursor = images.find({});
    const count = await cursor.count();
    if (count === 0) {
      return res.status(404).send({
        message: "Error: No Images found",
      });
    }

    const allImages = [];

    await cursor.forEach((item) => {
      allImages.push(item);
    });

    res.send({ files: allImages });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
});

app.get("/download/:filename", async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db("LinkUptournament");

    const imageBucket = new GridFSBucket(database, {
      bucketName: "photos",
    });

    let downloadStream = imageBucket.openDownloadStreamByName(
      req.params.filename
    );

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (data) {
      return res.status(404).send({ error: "Image not found" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
});
//YASSINE

//stripe
app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent/:id", async (req, res) => {
  try {
    const matchet = await m.findById(req.params.id);

    // Check if ticket number is greater than 0
    if (matchet.ticketNumber <= 0) {
      throw new Error("No more tickets available");
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: matchet.price,
      automatic_payment_methods: { enabled: true },
    });

    // Update match details
    matchet.price += 5;
    matchet.ticketNumber -= 1;
    await matchet.save();

    // Send publishable key, PaymentIntent details, and updated match details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      match: matchet,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

//YASSINE
app.use("/player", playerRouter);
app.use("/referee", refereeRouter);
app.use("/bracketStage", bracketStageRouter);
app.use("/group", groupRoutes);
app.use("/staduim", staduimRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/tourn", tournRouter);
app.use("/team", TeamRouter);
app.use("/match", match);
app.use("/academy", AcademyRouter);
app.use("/achievement", AchievementRouter);
app.use("/tachievement", TachievementRouter);

app.use("/uploads", express.static("uploads"));

// WebRTC endpoints
let senderStream; // Define senderStream outside of the routes

app.post("/consumer", async (req, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org",
      },
    ],
  });
  const desc = new webrtc.RTCSessionDescription(req.body.sdp);
  await peer.setRemoteDescription(desc);

  // Check if senderStream is defined before using it
  if (senderStream) {
    senderStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, senderStream));
  } else {
    console.error("senderStream is not defined.");
    // Handle the case when senderStream is not defined
    // You can send an error response or take appropriate action here
  }

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };

  res.json(payload);
});

app.post("/broadcast", async (req, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org",
      },
    ],
  });
  peer.ontrack = (e) => handleTrackEvent(e, peer);
  const desc = new webrtc.RTCSessionDescription(req.body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };

  res.json(payload);
});

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
}

module.exports = app;
