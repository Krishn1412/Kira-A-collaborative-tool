
const Ticket= require('../models/ticketModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const TeamMember= require("../models/teamMemberModel.js");

exports.testingFunction= catchAsyncError(async(req,res,next)=>{

    res.status(201).json({
        successMessage:"It's working fine!"
    })
});

exports.createTicket= catchAsyncError(async(req,res,next)=>{
//   const productManagerId= req.params.id;
//   const productManager = await Ticket.findById(req.params.id);
  const ticket = await Ticket.create(req.body);

  res.status(201).json({
    success: true,
    ticket,
  });
});

exports.ViewSingleTicket= catchAsyncError(async(req,res,next)=>{
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        return next(new ErrorHandler("Ticket not found", 404));
    }
    res.status(200).json({
        success: true,
        ticket,
    });
});
exports.assignTicket= catchAsyncError(async(req,res,next)=>{
    //   const productManagerId= req.params.id;
        const ticketId = req.body.ticket;
        const teamMemberId = req.body.teamMember;
      const ticket = await Ticket.findById(ticketId);
      const teammember = await TeamMember.findById(teamMemberId);
    //   const ticket = await Ticket.create(req.body);
        ticket.teamMember = teamMemberId;
        teammember.ticket = ticketId;
        await ticket.save({ validateBeforeSave: false });
        await teammember.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            ticket,
            teammember
        });
    });