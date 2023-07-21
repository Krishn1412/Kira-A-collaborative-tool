const TeamMember= require('../models/teamMemberModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const Ticket = require("../models/ticketModel.js");
const sendToken = require('../utils/jwtToken.js');


//login team member
exports.loginTM_User= catchAsyncError( async (req,res,next)=>{
    
  const {username,password} = req.body;

  if(!username || !password){
      return next(new ErrorHandler("Please enter username and password",400));
  }
  
  const userFound= await TeamMember.findOne({username: username}).select("+password");

  if(!userFound){
      return next(new ErrorHandler("Invalid username or password",400));
  }
  const isPasswordMatched= await userFound.comparePassword(password);

  if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid username or password",400));
  }
  
  sendToken(userFound,200,res);
});


//logout team member
exports.logoutTM_User = catchAsyncError( async (req,res,next)=>{
  res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true,
  });

  res.status(200).json({
      success:true,
      message:"Successfully logged out",
  });
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

exports.viewAssignedTickets = catchAsyncError(async (req, res, next) => {
  const teamMemberId = req.body.teamMemberId;

  try {
    // Find the team member by their ID
    const teamMember = await TeamMember.findById(teamMemberId);

    if (!teamMember) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    // Access the assigned tickets from the 'ticket' array in the team member object
    const assignedTickets = teamMember.ticket;

    return res.status(200).json({ success: true, assignedTickets });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
