const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // type: String,
    // required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
