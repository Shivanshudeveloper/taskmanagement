const express = require("express");
const router = express.Router();

// const User = require("../models/User");
// const Task = require("../models/Task");

const taskController = require("../controllers/task");
const userController = require("../controllers/user");
const teamController = require("../controllers/team");
const groupController = require("../controllers/group");
// Test route
router.get("/test", (req, res) => {
  res.send("Working");
});

// Tasks
// Add a new task
router.post("/add_task", taskController.createTask);
//Get all Tasks
router.get("/get_all_tasks/:userId", taskController.getAllTasks);
//Get all Tasks
router.get("/get_all_tasks", taskController.getAllTasksForAdmin);
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

router.get("/get_all_tasks_complete", taskController.getAllCompleteTasksForAdmin)

// User Data
// Add user data
router.post("/add_user", userController.createOrUpdateUser);
router.get("/get_all_users", userController.getAllUsers);
router.get("/get_user/:userId", userController.getUser);
router.post("/edit_user/:userId", userController.editUser);
// router.post("/edit_user2/:email", userController.editUser2);

// Add a new team
router.post("/add_team", teamController.createTeam);

//Get all Teams
router.get("/get_all_teams/:userId", teamController.getAllTeams);

//Get all Teams of Admin
router.get("/get_all_teams", teamController.getAllTeamsForAdmin);

router.delete("/delete_team/:teamId/:userId", teamController.deleteTeam);


// Add a new group
router.post("/add_group", groupController.createGroup);
{
  
}
//Get all Teams
router.get("/get_all_groups/:userId", groupController.getAllGroups);

//Get all Teams of Admin
router.get("/get_all_groups", groupController.getAllGroupsForAdmin);

router.delete("/delete_group/:groupId/:userId", groupController.deleteGroup);

module.exports = router;
