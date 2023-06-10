const Review = require('../model/reviewModel');
const AppError = require('../utils/appError');

// Get All Posts In Db ( Development Purpose Only )
const getAllReviews = async (req, res, next) => {
  res.send(await Review.find());
};

// Get All Reviwes per postId (averybody)
const postReviews = async (req, res, next) => {
  const { postId } = req.params;
  if (!(await Review.find({ postId: postId }))) {
    return next(new AppError('No Post With that Id', 400));
  }

  res.send(await Review.find({ postId: postId }));
};

// Create Review By Only User
const createReview = async (req, res, next) => {
  const { text, rate, userId, postId } = req.body;
  if (!rate || !userId || !postId) {
    return next(new AppError('All !rate || userId || postId Is A Must', 400));
  }
  const newReview = new Review({
    text: text,
    rate: rate,
    userId: userId,
    postId: postId,
  });
  await newReview.save();
  res.send(newReview);
};

// Edit Review By Only review-Creator (User)
const updateReview = async (req, res, next) => {
  const userId = req.user._id;
  const reviewId = req.params.id;
  !reviewId
    ? next(new AppError('Review Id Is Required as a Parameter !!', 400))
    : null;

  const review = await Review.findById(reviewId);
  !review ? next(new AppError("There's No review With That Id !!", 400)) : null;

  const { text, rate } = req.body;
  !rate ? next(new AppError("There's No review With That Id !!", 400)) : null;

  if (review.userId == userId) {
    await Review.findByIdAndUpdate(reviewId, { text: text, rate: rate });
    res.send(`Review With Id ${reviewId} , Edited Successfully`);
  } else {
    res.send('You Are Not Authorized');
  }
};

// Delete Review usng review_id only By Admin
const deleteReview = async (req, res, next) => {
  const reviewId = req.params.id;
  !reviewId
    ? next(new AppError('Review Id Is Required as a Parameter !!', 400))
    : null;

  if (await Review.findByIdAndDelete(reviewId)) {
    res.send(`Review With Id ${reviewId} Deleted Successfuly`);
  } else {
    next(new AppError("There's No review With That Id !!", 400));
  }
};

module.exports = {
  getAllReviews,
  postReviews,
  createReview,
  updateReview,
  deleteReview,
};
