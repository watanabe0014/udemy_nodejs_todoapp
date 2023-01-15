const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
    try{
        const getAllTask = await Task.find({});
        res.status(200).json(getAllTask);
    }catch(err){
        res.status(500).json(err);
    }};

const createTask = async (req, res) => {
    try{
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    }catch(err){
        res.status(500).json(err);
    }
};

const getTask = async (req, res) => {
    try{
        const getTask = await Task.findOne({_id:req.params.id});
        res.status(200).json(getTask);
        if(!getTask){
            return res.status(404).json("指定されたIDは見つかりません。");
        }
    }catch(err){
        res.status(500).json(err);
    }
};

const updateTask = async (req, res) => {
    try{
        const updatedTask = await Task.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {
                new : true,
            }
            );
        res.status(200).json(updatedTask);
        if(!updatedTask){
            return res.status(404).json("指定されたIDは見つかりません。");
        }
    }catch(err){
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
    getTask,
    updateTask,
    deleteTask,
}