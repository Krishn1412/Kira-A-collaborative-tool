const EngineeringManager= require('../models/emModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const TeamMember = require("../models/teamMemberModel.js");
const Team = require("../models/teamModel.js");

exports.testingFunction= catchAsyncError(async(req,res,next)=>{
    const id = req.body.id;
    const em = await EngineeringManager.findById(id);
    res.status(201).json({
        successMessage:"It's working fine!",
        saaleKaPassword: em.password,
    })
});

exports.createEngineeringManager = catchAsyncError(async(req,res,next)=>{
//   const productManagerId= req.params.id;
//   const productManager = await Ticket.findById(req.params.id);
  const em = await EngineeringManager.create(req.body);

  res.status(201).json({
    success: true,
    em,
  });
});

exports.assignTeam = catchAsyncError(async(req,res,next)=>{
    const teamMemId= req.body.teamMemId;
    const teamId = req.body.teamId;
    const teamMem = await TeamMember.findById(teamMemId);
    const team = await Team.findById(teamId);
    teamMem.team = team;
    await teamMem.save({ validateBeforeSave: false });
    res.status(201).json({
    success: true,
    teamMem,
    });
});