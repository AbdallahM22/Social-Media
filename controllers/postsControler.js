const Post = require("../model/postModel");
const AppError = require("../utils/appError");
const Comment = require("../model/commentModel");
const Review = require("../model/reviewModel");

// Get All Posts In Db ( admin Only )
const allPosts = async (req, res, next) => {
  res.status(200).send(await Post.find());
};

// get post by id

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  const userPosts = await Post.findOne({ _id: postId })
    .populate("comments")
    .populate("reviews");
  res.status(200).send(userPosts);
};

// Create Post By Only User
const createPost = async (req, res, next) => {
  const userId = req.user._id;
  const { text } = req.body;
  if (!text || !userId)
    return next(new AppError("please provide post text and user Id !!", 400));

  const postCreated = new Post({ text, userId });
  await postCreated.save();
  res.status(201).send(postCreated);
};

// Edit Post By Only Post-Creator (User)
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!(await Post.findById(id)) || !text) {
    return next(
      new AppError(
        "please provide New post Text In the Req Body and valid user Id as a Param !!",
        400
      )
    );
  }
  await Post.findByIdAndUpdate(id, { text: text });
  res.status(200).send(`Post With Id ${id}, Edited Successfuly`);
};

// Delete Post & it's comments & it's reviews using post Id ( only Admin )
const deletePost = async (req, res, next) => {
  const postId = req.params.id;

  if (!(await Post.findById(postId))) {
    return next(new AppError("No Post With That Id In DB !", 400));
  }

  await Comment.deleteMany({ postId: postId });

  await Review.deleteMany({ postId: postId });

  await Post.findByIdAndDelete(postId);

  res
    .status(204)
    .send(`Post With Id ${postId} and Comment and Review Deleted Successfuly`);
};
// Get Top Rated Posts
const topRatedPosts = async (req, res, next) => {
  let result = await Review.aggregate([
    { $group: { _id: "$postId", avgRating: { $avg: "$rate" } } },
  ])
    .sort({ avgRating: -1 })
    .limit(5);

  result = result.map(async (res) => {
    const post = await Post.findById(res._id);
    return { post, avgRating: res.avgRating };
  });

  result = await Promise.all(result);
  res.status(200).send(result);
};
module.exports = {
  createPost,
  updatePost,
  deletePost,
  allPosts,
  getPostById,
  topRatedPosts,
};
