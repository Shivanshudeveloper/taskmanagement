const express = require("express");
const router = express.Router();

// const User = require("../models/User");
// const Task = require("../models/Task");

const taskController = require("../controllers/task");
const userController = require("../controllers/user");

// Test route
router.get("/test", (req, res) => {
  res.send("Working");
});

// Tasks
// Add a new task
router.post("/add_task", taskController.createTask);
//Get all Tasks
router.get("/get_all_tasks/:userId", taskController.getAllTasks);
// Delete a task
router.delete("/delete_task/:taskId/:userId", taskController.deleteTask);
// Get a single task
router.get("/get_creator_by_id/:taskId", taskController.getSpecificTask);
//Patch a task
router.patch("/edit_task/:taskId/:userId", taskController.editTask);

// User Data
// Add user data
router.post("/add_user", userController.createOrUpdateUser);
router.get("/get_user/:userId", userController.getUser);
router.post("/edit_user/:userId", userController.editUser);

module.exports = router;
