const TeamMember= require('../models/teamMemberModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const Ticket = require("../models/ticketModel.js");

exports.testingFunction= catchAsyncError(async(req,res,next)=>{

    res.status(201).json({
        successMessage:"It's working fine!"
    })
});

exports.createTeamMember = catchAsyncError(async(req,res,next)=>{
//   const productManagerId= req.params.id;
//   const productManager = await Ticket.findById(req.params.id);
  const teamMember = await TeamMember.create(req.body);

  res.status(201).json({
    success: true,
    teamMember,
  });
});
exports.updateStatus = catchAsyncError(async(req,res,next)=>{
    const ticketId= req.body.id;
    const newStatus = req.body.status;
    const ticket = await Ticket.findById(ticketId);
    ticket.status = newStatus;
    await ticket.save({ validateBeforeSave: false });
    res.status(201).json({
    success: true,
    ticket,
    });
});
