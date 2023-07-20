const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  description:{
    type:String,
    required: true,
  },
  priority:{
    type:String,
    required: true,
  },
  status:{
    type:String,
    required: true,
  },
  productManager: {
    type: mongoose.Schema.ObjectId,
    ref: "ProductManager",
    required: true,
  },
  teamMember: {
    type: mongoose.Schema.ObjectId,
    ref: "TeamMember",
    default: null,
  },
});
module.exports = mongoose.model("Ticket", ticketSchema);