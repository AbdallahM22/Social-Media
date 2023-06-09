const express = require("express");
const route = express.Router();

const authController = require("../controllers/authController");

const {
  createNewComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");
//Crud Operations

// Create New Comment
route.post(
  "/",
  authController.protect,
  authController.restrictTo("user"),
  createNewComment
);

// Get All comments In Db ( Development Purpose Only )
route.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  getAllComments
);

//Get A comment by Comment Id
route.get(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  getCommentById
);

//Delete A comment using Comment Id
route.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  deleteComment
);

//update A comment

route.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("user"),
  updateComment
);

module.exports = route;
