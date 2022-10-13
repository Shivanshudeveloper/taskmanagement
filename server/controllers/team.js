const Team = require("../models/Team");

const CC = require("currency-converter-lt");

const createTeam = (req, res) => {

  const { fullname, email, phone_number, userId } = req.body;
  res.setHeader("Content-Type", "application/json");

  const newTeam = new Team({
    fullname,
    email,
    phone_number,
    userId
  });

  newTeam.save((err) => {
    console.log(err);
    if (err) res.status(400).json(`Error: ${err}`);
  });
  res.status(200).json("added a new teammember");
};

const getAllTeams = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
    Team.find({ userId: req.params.userId })
      .then((p) => res.status(200).json(p))
      .catch((error) => res.status(400).json(error));
};

const getAllTasksUsingEmail = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // console.log(req.params.assignedTo)
  Task.find({ assignedTo: req.params.assignedTo })
    .then((p) => res.status(200).json(p))
    .catch((error) => res.status(400).json(error));
};

const getAllCompleteTasks = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // console.log(req.params.assignedTo)
  Task.find({ userId: req.params.userId, status: 1 })
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
  const { name, description, assignedTo, fromDate, targetDate, points, status, userId, createdAt, approved } = req.body;
  Task.updateOne(
    { _id: req.params.taskId, userId: req.params.userId },
    {
      $set: {
        status,
        approved
      }
    }
    // (err) => {
    //   if (err) res.status(400).json(`Error: ${err}`);
    //   else res.status(200).json("Edited a task");
    // }
  )
    .then((data) => {
      res.status(200).json({ status, data });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createTeam,
  getAllTeams,
  deleteTask,
  getSpecificTask,
  editTask,
  getAllTasksUsingEmail,
  getAllCompleteTasks
};
