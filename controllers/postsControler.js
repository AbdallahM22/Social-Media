const Post = require('../model/postModel');
const AppError = require('../utils/appError');
const User = require('../model/userModel');
const Comment = require('../model/commentModel');
const Review = require('../model/reviewModel');


// Get All Posts In Db ( admin Only )
const allPosts = async (req, res, next) => {
  res.send(await Post.find());
};

// All User Posts per userId ( averybody )
const getUserPosts = async (req, res, next) => {
  const { userId } = req.params;
  const userPosts = await Post.find({ userId: userId });
  res.send(userPosts);
};

// Create Post By Only User
const createPost = async (req, res, next) => {
  const userId = req.user._id;
  const { text } = req.body;
  if (!text || !userId)
    return next(new AppError('please provide post text and user Id !!', 400));

  const postCreated = new Post({ text, userId });
  await postCreated.save();
  res.send(postCreated);
};

// Edit Post By Only Post-Creator (User)
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!(await Post.findById(id)) || !text) {
    return next(
      new AppError(
        'please provide New post Text In the Req Body and valid user Id as a Param !!',
        400
      )
    );
  }
  await Post.findByIdAndUpdate(id, { text: text });
  res.send(`Post With Id ${id}, Edited Successfuly`);
};

// Delete Post & it's comments & it's reviews using post Id ( only Admin )
const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  console.log(req.user);


  if (!(await Post.findById(id))) {
    return next(new AppError("No Post With That Id In DB !", 400));
  }

  await Comment.deleteMany({ postId: postId });

  await Review.deleteMany({ postId: postId });

  await Post.findByIdAndDelete(postId);

  res.send(`Post With Id ${postId} and Comment and Review Deleted Successfuly`);
};

module.exports = { createPost, updatePost, deletePost, getUserPosts, allPosts };
