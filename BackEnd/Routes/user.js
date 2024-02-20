const router = require("express").Router();

const { catchErrors } = require("../handlers/errorHandlers");
const { register, login } = require("../Controllers/userController");

router.post("/login", catchErrors(login));
router.post("/register", catchErrors(register));

module.exports = router;
