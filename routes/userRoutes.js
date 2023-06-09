const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// authentication
router.post("/signup", authController.validateSignup, authController.signup);
router.post("/login", authController.validateLogin, authController.login);

// crud
// get all users
router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getAllUsers
);

// update user's password
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.restrictTo("user", "admin"),
  authController.updatePassword
);

router.patch(
  "/updateMe",
  authController.protect,
  authController.restrictTo("user", "admin"),
  userController.uploadUserPhoto,
  userController.updateMe
);

// get user by id
router.get(
  "/:id",
  authController.protect,
  authController.restrictTo("user", "admin"),
  userController.getUser
);

module.exports = router;
