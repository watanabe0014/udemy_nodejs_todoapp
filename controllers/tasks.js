const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  // res.send("全てのタスクをファイルから取得しました");
  try {
    const allTasks = await Task.find({});
    // res.send("タスクをファイルから作成しました");
    // res.json(createTask);
    res.status(201).json(allTasks);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body);
    // res.send("タスクをファイルから作成しました");
    // res.json(createTask);
    res.status(201).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleTask = async (req, res) => {
  // res.send("１つのタスクをファイルから取得しました");
  // const getSingleTask = {
  //   id: req.params.id,
  // };
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id });

    if (!getSingleTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }

    res.status(200).json(getSingleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  // res.send("タスクをファイルから更新しました");
  const { id: taskID } = req.params;
  try {
    const updateTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, //更新後の情報が見れる。
    }); //第一引数にreq.params.idはダメ見たい。

    if (!updateTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }

    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  // res.send("タスクをファイルから削除しました");
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

    if (!deleteTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }

    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
