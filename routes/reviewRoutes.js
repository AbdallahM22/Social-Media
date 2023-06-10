const express = require("express");
const router = express.Router();

require("express-async-errors");

const authController = require("../controllers/authController");
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Get All Reviwes In Db ( Development Purpose Only )
router.get("/", getAllReviews);

// Get All Reviwes per postId (averybody)
router.get(
  "/:id",
  authController.protect,
  authController.restrictTo(["user", "admin"]),
  getReview
);

// Create Review By Only User
router.post(
  "/",
  authController.protect,
  authController.restrictTo("user"),
  createReview
);

// Edit Review By Only review-Creator (User)
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo(["user", "admin"]),
  updateReview
);

// Delete Review usng review_id only By Admin
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  deleteReview
);

module.exports = router;
