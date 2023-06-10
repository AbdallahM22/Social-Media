const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
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
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});
postSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "postId",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
