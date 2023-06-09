const express = require('express');
const router = express.Router();

require('express-async-errors');

// Post Model
const {
  createPost,
  updatePost,
  allPosts,
  getUserPosts,
  deletePost,
} = require('../controllers/postsControler');

// const {
//   getAllUsers,
//   getUser,
//   signup,
//   editUser,
//   partialyEditUser,
//   deleteUser,
// } = require('../controllers/authenticationController');
// const { signupValidation } = require('../utils/authenticationScheama');

// restfull api (users) crud create read update delete

// read All
router.get('/', allPosts);

// All Posts per userId
router.get('/:userId', getUserPosts);

// 1 -Find Post Per ID
// router.get('/:userId?postId', async (req, res, next) => {
//   const { postId } = req.params;
//   const userPosts = await Post.findOne({ _id: postId });
//   res.send(userPosts);
// });

// create (Post)
router.post('/', createPost);

// Partialy Update
router.patch('/:id', updatePost);

// Delete Post
router.delete('/:id', deletePost);

module.exports = router;
