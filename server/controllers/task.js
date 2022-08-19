const Task = require("../models/Task");

const CC = require("currency-converter-lt");

const createTask = (req, res) => {
  console.log(req.body);

  res.setHeader("Content-Type", "application/json");

  const newTask = new Task({
    ...req.body,
  });

  newTask.save((err) => {
    console.log(err);
    if (err) res.status(400).json(`Error: ${err}`);
    else res.status(200).json("added a new task");
  });
};

const getAllTasks = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Task.find({ userId: req.params.userId })
    .then((p) => res.status(200).json(p))
    .catch((error) => res.status(400).json(error));
};

const deleteTask = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Task.deleteOne(
    { _id: req.params.taskId, userId: req.params.userId },
    (err) => {
      if (err) res.status(400).json(`Error: ${err}`);
      else res.status(200).json("Deleted one task successfully!");
    }
  );
};

const getSpecificTask = async (req, res) => {
  console.log(req.params.taskId);
  res.setHeader("Content-Type", "application/json");
  Task.findOne({ _id: req.params.taskId })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(`Error: ${error}`);
    });
};

const editTask = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Task.updateOne(
    { _id: req.params.taskId, userId: req.params.userId },
    {
      $set: req.body,
    },
    (err) => {
      if (err) res.status(400).json(`Error: ${err}`);
      else res.status(200).send("Edited a task");
    }
  );
};
module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  getSpecificTask,
  editTask,
};
