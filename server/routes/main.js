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
router.put("/edit_task/:taskId/:userId", taskController.editTask);
//get task assigned to a user
router.get("/get_all_tasks_mail/:assignedTo", taskController.getAllTasksUsingEmail)
//get task assigned to a user
router.get("/get_all_tasks_complete/:userId", taskController.getAllCompleteTasks)

// User Data
// Add user data
router.post("/add_user", userController.createOrUpdateUser);
router.get("/get_all_users", userController.getAllUsers);
router.get("/get_user/:userId", userController.getUser);
router.post("/edit_user/:userId", userController.editUser);
// router.post("/edit_user2/:email", userController.editUser2);

module.exports = router;
