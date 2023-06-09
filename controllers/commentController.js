const AppError= require('../utils/appError');
const Comment=require('../model/commentModel');



 /////Create New Comment Comments 
const createNewComment=async (req,res,next)=>
{
    const {commentBody,postId}=await req.body;
    if(!commentBody) return next(new AppError("Post Can't be Empty",400));
    const newCommnet= new Comment({commentBody,postId});
    await newCommnet.save();      
     res.send(newCommnet)

}

/////Get All Comments
const getAllComments=async (req,res,next)=>
{
    const allComments= await Comment.find()
    res.send(allComments); 
    
}
////Get The Comments Of Specific Post
const getPostComments=async (req,res,next)=>
{
    const Id=req.params.postId;
    console.log(Id);
    const comment=await Comment.find({postId:Id})
    res.send(comment);

}

////Get A comment using Comment Id
const getCommentById=async (req,res,next)=>
{
    const Id=req.params.id;
    console.log(Id);
    const comment=await Comment.findOne({_id:Id})
    res.send(comment);

}

////Delete A comment Using Id 
const deleteComment= async (req,res,next)=>
{
    const id=req.params.id;
    const comment =await Comment.findById(id);
    if(!comment) return next(new AppError("This Post isn't in the posts",400));
    await Comment.findByIdAndRemove(id);
    res.send('post Has Been Deleted');
}

/////Update A comment   
const updateComment=async (req,res,next)=>{
    const comment =await Comment.findById(req.params.id);
    if(!comment) return next(new AppError(`the comment with Id=${req.params.id} doesn't exist`,400))
    const {commentBody}= await req.body;

    if(!commentBody) return next(new AppError("This Comment isn't Exist anymore",400));

    if(!commentBody) return next(new AppError("can't update with empty",400));

    await Comment.findByIdAndUpdate(req.params.id,{commentBody:commentBody});
    res.send(await Comment.findById(req.params.id))
    
}


module.exports=
{
    createNewComment,
    getAllComments,
    getPostComments,
    getCommentById,
    deleteComment,
    updateComment
    
}