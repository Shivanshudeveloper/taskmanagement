const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

const team = mongoose.model("team", teamSchema);
module.exports = team;
