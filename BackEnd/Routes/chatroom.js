const router = require("express").Router();
const { catchErrors } = require("../Handlers/errorHandlers");
const { createChatroom, getAllChatroom } = require("../Controllers/chatroomController"); // Ensure correct import path
const auth = require("../Middlewares/auth");

router.post("/", catchErrors(createChatroom));
router.get("/", catchErrors(getAllChatroom));

module.exports = router;
