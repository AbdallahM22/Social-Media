const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  text: {
    type: String,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
