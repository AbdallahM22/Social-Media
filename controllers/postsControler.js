const Post = require('../model/postModel');
const AppError = require('../utils/appError');

const allPosts = async (req, res, next) => {
  res.send(await Post.find());
};

const getUserPosts = async (req, res, next) => {
  const { userId } = req.params;
  const userPosts = await Post.find({ userId: userId });
  res.send(userPosts);
};

const createPost = async (req, res, next) => {
  const { text, userId } = req.body;
  if (!text || !userId)
    return next(new AppError('please provide post text and user Id !!', 400));
  const postCreated = new Post({ text, userId });
  await postCreated.save();
  res.send(postCreated);
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!(await Post.findById(id)) || !text) {
    return next(
      new AppError(
        'please provide New post Text In the Req Body and user Id as a Param !!',
        400
      )
    );
  }
  await Post.findByIdAndUpdate(id, { text: text });
  res.send(`Post With Id ${id} , `);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  if (!(await Post.findById(id))) {
    return next(new AppError('No Post With That Id In DB !', 400));
  }

  await Post.findByIdAndDelete(id);
  res.send(`Post With Id ${id} Deleted Successfuly`);
};

module.exports = { createPost, updatePost, deletePost, getUserPosts, allPosts };
