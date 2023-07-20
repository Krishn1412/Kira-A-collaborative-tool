const mongoose = require("mongoose");

const teamMemSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  username: {
    type:String,
    required: true,
  },
  password: {
    type:String,
    required: true,
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
    default: null,
  },
  ticket: {
    type: mongoose.Schema.ObjectId,
    ref: "Ticket",
    default: null,
  },
});
module.exports = mongoose.model("TeamMember", teamMemSchema);