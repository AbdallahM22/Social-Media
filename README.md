# Project Name
Node.js Social Media :-

Create Social Media Backend Server based on the following guidelines.
-Create user model and crud operation
Note: implement Role based authentication where there are [admin, user]	
-Create Post Model and crud operation
-Create Comments Model and crud operation
-Create Review System where users* can create reviews for posts created by creators* (Review Model and crud operation)
-Each user can have profile pictures 
by using multer package to upload images & upload images to cloudinary free hosting service for images.
--Notes:
Protect the apis so that only allowed Roles can use certain apis 
Example: only admin role can delete creators,users,posts…
When getting each post retrieve all its comments and reviews with it.
When getting user retrieve its posts with it
When deleting user the associated posts,comments and reviews were deleted
Protect sensitive information such as passwords form returning
Implement request validation using Joi or similar packages
Implement error handling strategy

## Installation
express,
express-async-errors,
dotenv,
Joi,
bcrypt,
jsonwebtoken,
cloudinary,
multer,
mongoose.
## Usage
use postman to do requests of (crud) of user ,post,comment and review , 
use Robo 3T  or mongoDBCompass to show the results of requests.
