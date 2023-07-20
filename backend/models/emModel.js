const mongoose = require("mongoose");
const jwt= require("jsonwebtoken");

const emSchema = new mongoose.Schema({
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
});

emSchema.methods.comparePassword = async function(passwordEntered) {
  return passwordEntered==this.password;
};

emSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("EngineeringManager", emSchema);