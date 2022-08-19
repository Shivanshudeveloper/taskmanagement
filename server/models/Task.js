const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  // status
  // 0 - pending
  // 1 - completed
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  targetDate: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const task = mongoose.model("task", taskSchema);
module.exports = task;
