
const Ticket= require('../models/ticketModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const TeamMember= require("../models/teamMemberModel.js");

exports.ViewAllTickets= catchAsyncError(async(req,res,next)=>{
    const ticketCount= await Ticket.countDocuments();
    
    const tickets= await Ticket.find();
    res.status(200).json({
        success: true,
        ticketCount,
        tickets,
    });
});

exports.ViewUnassignedTickets= catchAsyncError(async(req,res,next)=>{
    
    const tickets = await Ticket.find({ teamMember: null });
    const ticketCount = await Ticket.countDocuments({ teamMember: null });
    res.status(200).json({
        success: true,
        ticketCount,
        tickets,
    });
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
        teammember.ticket.push(ticketId);
        ticket.teamMember = teamMemberId;
        // teammember.ticket = ticketId;
        await ticket.save({ validateBeforeSave: false });
        await teammember.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            ticket,
            teammember
        });
    });