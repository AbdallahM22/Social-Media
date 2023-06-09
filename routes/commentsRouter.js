const express=require('express');
const { request } = require('../app');
const AppError=require('../utils/appError')
const route=express.Router();
const Comment=require('../model/commentModel');
const 
{createNewComment,
 getAllComments,
 getPostComments,
 getCommentById,
 deleteComment,
 updateComment

}=require('../controllers/commentController')
//Crud Operations 
//C
route.post('/',createNewComment)

// Get All Comments
route.get('/',getAllComments)


//Get the comments of sepcific post Id
route.get('/:postId',getPostComments)


//Get A comment by Comment Id 
route.get('/id/:id',getCommentById)

// //Delete A comment 

route.delete('/:id',deleteComment)

//update A comment 

route.patch('/:id', updateComment)


module.exports=route