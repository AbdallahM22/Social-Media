const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// crud
router.get("/", userController.getAllUsers);

module.exports = router;
