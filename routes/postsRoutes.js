const express = require("express");
const router = express.Router();

require("express-async-errors");

const authController = require("../controllers/authController");

const authController = require('../controllers/authController');

const {
  createPost,
  updatePost,
  allPosts,
  getUserPosts,
  deletePost,
} = require("../controllers/postsControler");

// Get All Posts In Db ( admin Only )
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  allPosts
);

// All User Posts per userId ( averybody )
router.get(
  '/:userId',
  authController.protect,
  authController.restrictTo(['user', 'admin']),
  getUserPosts
);


// Problem get('/:postId' or '/:userId'
// 1 -Find Post Per ID
// router.get('/:postId', async (req, res, next) => {
//   const { postId } = req.params;
//   const userPosts = await Post.findOne({ _id: postId });
//   res.send(userPosts);
// });

// Create Post By Only User
router.post(
  '/',
  authController.protect,
  authController.restrictTo('user'),
  createPost
);

// Edit Post By Only Post-Creator (User)
router.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('user'),
  updatePost
);

// Delete Post & it's comments & it's reviews using post Id ( only Admin )
router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  deletePost
);


module.exports = router;
