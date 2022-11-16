const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  members:{
    type: Array,
    required:true,
  },
  // groupId: {
  //   type: String,
  //   required: true,
  // },
  userId: {
    type: String,
    required: true,
  }
});

const group = mongoose.model("group", teamSchema);
module.exports = group;