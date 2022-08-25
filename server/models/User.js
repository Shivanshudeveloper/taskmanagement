const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    required: true,
  },
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  contact: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
