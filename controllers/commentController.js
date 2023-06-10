const AppError = require("../utils/appError");
const Comment = require("../model/commentModel");

// Create New Comment
const createNewComment = async (req, res, next) => {
  const userId = req.user._id;
  const { commentBody, postId } = req.body;
  if (!commentBody) return next(new AppError("Post Can't be Empty", 400));
  const newCommnet = new Comment({ commentBody, postId, userId });
  await newCommnet.save();
  res.status(201).send(newCommnet);
};

// Get All comments In Db ( Development Purpose Only )
const getAllComments = async (req, res, next) => {
  const allComments = await Comment.find();
  res.status(200).send(allComments);
};


////Get A comment using Comment Id
const getCommentById = async (req, res, next) => {
  const Id = req.params.id;
  const comment = await Comment.findOne({ _id: Id });
  res.status(200).send(comment);
};

//Delete A comment using Comment Id
const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;
  if (!(await Comment.findById(commentId)))
    return next(new AppError("No Comment With That Id", 400));
  Comment.findByIdAndRemove(commentId)
    .then(res.status(204).send(`Comment with Id ${commentId} Has Been Deleted`))
    .catch((error) => next(new AppError(error, 500)));
};

// Update A comment
const updateComment = async (req, res, next) => {
  const userId = req.user._id;
  const comment = await Comment.findById(req.params.id);
  if (!comment)
    return next(
      new AppError(`the comment with Id=${req.params.id} doesn't exist`, 400)
    );

  if (comment.userId == userId) {
    const { commentBody } = await req.body;

    if (!commentBody) return next(new AppError("can't update with empty", 400));

    await Comment.findByIdAndUpdate(req.params.id, {
      commentBody: commentBody,
    });
    res.status(200).send(await Comment.findById(req.params.id));
  } else {
    res.status(200).send("Not Authorized To Update");
  }
};

module.exports = {
  createNewComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
};
