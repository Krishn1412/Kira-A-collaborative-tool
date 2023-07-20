const mongoose = require("mongoose");
const jwt= require("jsonwebtoken");

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

teamMemSchema.methods.comparePassword = async function(passwordEntered) {
  return passwordEntered==this.password;
};

teamMemSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("TeamMember", teamMemSchema);