const Task = require("../models/Task");

const CC = require("currency-converter-lt");

const createTask = (req, res) => {
  // console.log(req.body);
  
  // res.setHeader("Content-Type", "application/json");

  // const newTask = new Task({
  //   ...req.body,
  // });

  // newTask.save((err) => {
  //   console.log(err);
  //   if (err) res.status(400).json(`Error: ${err}`);
  //   else res.status(200).json("added a new task");
  // });

  // console.log(req.body.assignedTo);
  const {name, description, fromDate, targetDate, points, userId, approved } = req.body;
  res.setHeader("Content-Type", "application/json");

  req.body.assignedTo.forEach(mail => {
    console.log(mail);

    const newTask = new Task({
      name,
      description,
      assignedTo: mail,
      fromDate,
      targetDate,
      points,
      userId,
      approved
    });

    newTask.save((err) => {
      console.log(err);
      if (err) res.status(400).json(`Error: ${err}`);
      // else res.write(json("added a new task"));
    });
  })
  res.status(200).json("added a new task");
};

const getAllTasks = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // console.log(req.query.name)

  if(req.query.name)
  {
    Task.find({ userId: req.params.userId, assignedTo: req.query.name })
    .then((p) => res.status(200).json(p))
    .catch((error) => res.status(400).json(error));  
  }
  else
  {
    Task.find({ userId: req.params.userId })
    .then((p) => res.status(200).json(p))
    .catch((error) => res.status(400).json(error));
  }
};


const getAllTasksForAdmin = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try{
   const data = await Task.find();
   res.json(data);
    
  }
  catch(error){
    res.json(error);
  }
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

const getAllCompleteTasksForAdmin = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try{
    const data = await Task.find();
    res.json(data);
     
   }
   catch(error){
     res.json(error);
   }
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
  const {name, description, assignedTo, fromDate, targetDate, points, status, userId, createdAt, approved} = req.body;
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
  createTask,
  getAllTasks,
  getAllTasksForAdmin,
  deleteTask,
  getAllCompleteTasksForAdmin,
  getSpecificTask,
  editTask,
  getAllTasksUsingEmail,
  getAllCompleteTasks
};
