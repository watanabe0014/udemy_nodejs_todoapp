const mongoose = require("mongoose");

// const MONGO_URL =
//   "mongodb+srv://shincode:a@cluster0.l9pmj.mongodb.net/todoapp?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("データベースと接続中・・・"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
