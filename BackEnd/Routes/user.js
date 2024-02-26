const router = require("express").Router();

const { catchErrors } = require("../handlers/errorHandlers");
const  registerController  = require("../Controllers/registerController");
const  authController  = require("../Controllers/authController");
const { getAllUsers } = require('../Controllers/getAllUsers');
const verifyJWT = require('../middlewares/verifyJWT')
const  refreshTokenController  = require("../Controllers/refreshTokenController");
router.post("/register", registerController.handleNewUser);
router.post("/login", authController.handleLogin);
router.get('/users',verifyJWT, getAllUsers);
router.get("/refresh", refreshTokenController.handleRefreshToken);

module.exports = router;
