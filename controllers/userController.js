const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/userModel");

const cloudinary = require("../utils/cloudinary");

const multerStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "public/img/users");
  // },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");
// get all users
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

// update
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  // let upload;
  if (req.file) {
    filteredBody.photo = req.file.filename;
    console.log(req.file.path);
    await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: "profile",
    });
    // try {
    //   cloudinary.v2.uploader
    //     .upload(req.file.path)
    //     .then((result) => console.log(result))
    //     .catch((err) => console.log(err));
    // } catch (err) {
    //   console.log(err);
    // }
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
    // file: upload.secure_url,
  });
};
