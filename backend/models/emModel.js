const mongoose = require("mongoose");

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
module.exports = mongoose.model("EngineeringManager", emSchema);