const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  postReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

require('express-async-errors');

// Post Model

// read All reviews in DB
router.get('/', getAllReviews);

// All Reviwes per postId
router.get('/:postId', postReviews);

// create (Post)
router.post('/', createReview);

// Partialy Update
router.patch('/:id', updateReview);

// Delete Review
router.delete('/:id', deleteReview);

module.exports = router;
