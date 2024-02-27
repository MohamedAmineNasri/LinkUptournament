const router = require("express").Router();

const { catchErrors } = require("../handlers/errorHandlers");
const  registerController  = require("../Controllers/registerController");
const  authController  = require("../Controllers/authController");
const { getAllUsers } = require('../Controllers/getAllUsers');
const verifyJWT = require('../middlewares/verifyJWT')
const  refreshTokenController  = require("../Controllers/refreshTokenController");
const  handleLogout  = require("../Controllers/LogoutController");
const verifyRoles = require("../middlewares/verifyRoles");


router.post("/register", registerController.handleNewUser);
router.post("/login", authController.handleLogin);
// router.get('/users',verifyJWT, getAllUsers);
router.get('/users', verifyJWT, verifyRoles("Admin"), getAllUsers);
router.get("/refresh", refreshTokenController.handleRefreshToken);
router.get("/logout", handleLogout.handleLogout);

module.exports = router;
