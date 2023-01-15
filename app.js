const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

const PORT = 5001;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute);

//DBと接続
const start = async () => {
    try{
        await connectDB(process.env.HEROKU_MONGO_URL || process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT, () => {
            console.log("mongo_todo_appのサーバーが起動しました");
        });
    } catch (err) {
        console.log(err);
    };
};

start();

