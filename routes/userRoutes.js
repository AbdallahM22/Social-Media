const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// crud
// get all users
router.get("/", authController.protect, userController.getAllUsers);

// update user's password
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.updateMe
);

module.exports = router;
