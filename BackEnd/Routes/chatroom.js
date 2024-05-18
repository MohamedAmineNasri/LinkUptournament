const router = require("express").Router();
const { catchErrors } = require("../Handlers/errorHandlers");
const { createChatroom, getAllChatroom } = require("../Controllers/ChatroomController"); // Ensure correct import path

router.post("/", catchErrors(createChatroom));
router.get("/", catchErrors(getAllChatroom));

module.exports = router;
