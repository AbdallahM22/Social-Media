const Review = require('../model/reviewModel');
const AppError = require('../utils/appError');

const getAllReviews = async (req, res, next) => {
  res.send(await Review.find());
};

const postReviews = async (req, res, next) => {
  const { postId } = req.params;
  if (!(await Review.find({ postId: postId }))) {
    return next(new AppError('No Post With that Id', 400));
  }

  res.send(await Review.find({ postId: postId }));
};

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
const updateReview = async (req, res, next) => {
  const { id } = req.params;
  const { text, rate } = req.body;
  if (!(await Review.findById(id))) {
    return next(new AppError('There is no Review with that Name !!', 400));
  }
  await Review.findByIdAndUpdate(id, { text: text, rate: rate });
  res.send(`Review With Id ${id} , Edited Successfully`);
};

const deleteReview = async (req, res, next) => {
  const { id } = req.params;

  if (!(await Review.findById(id))) {
    return next(new AppError('No Review With That Id In DB !', 400));
  }

  await Review.findByIdAndDelete(id);
  res.send(`Review With Id ${id} Deleted Successfuly`);
};

module.exports = {
  getAllReviews,
  postReviews,
  createReview,
  updateReview,
  deleteReview,
};
