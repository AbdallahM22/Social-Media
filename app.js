const express = require("express");
require("dotenv").config();
require("express-async-errors");

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");

const app = express();

// parsing body
app.use(express.json());
app.use(express.urlencoded());

app.get("/a", (req, res) => {
  res.send("success");
});

// routes
app.use("/users", userRouter);

// not found pages
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//global error handling
app.use(globalErrorHandler);
module.exports = app;
