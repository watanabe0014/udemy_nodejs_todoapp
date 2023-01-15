const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url)
    .then(() => console.log("DBと接続中"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;