const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const { createChatroom, getAllChatroom } = require("../Controllers/chatroomController"); // Ensure correct import path
const auth = require("../middlewares/auth");

router.post("/", catchErrors(createChatroom));
router.get("/", catchErrors(getAllChatroom));

module.exports = router;
