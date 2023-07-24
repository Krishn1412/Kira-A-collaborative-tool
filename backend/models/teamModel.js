const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  engineeringManager: {
    type: mongoose.Schema.ObjectId,
    ref: "EngineeringManager",
    required: true,
  },
  productManager: {
    type: mongoose.Schema.ObjectId,
    ref: "ProductManager",
    required: true,
  },
});
module.exports = mongoose.model("Team", teamSchema);