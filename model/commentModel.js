const { string } = require('joi');
const mongoose= require('mongoose');

const {Schema}=mongoose;

const commentSchema=new Schema(
    {  
        commentBody:
        {
            type:String,
            required:true,
        },
        postId:
        {
            type:String,
            required:true
        },
        created_at:
        {
           type: Date,
           default: Date.now()
        }
    })  

    const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;