const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.DB_URL + "social")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.listen(3000, "127.0.0.1", () => {
  console.log("listenning successfully");
});
