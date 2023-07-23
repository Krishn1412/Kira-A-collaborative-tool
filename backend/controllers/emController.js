const EngineeringManager= require('../models/emModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const TeamMember = require("../models/teamMemberModel.js");
const Team = require("../models/teamModel.js");
const sendToken = require('../utils/jwtToken.js');

// exports.testingFunction= catchAsyncError(async(req,res,next)=>{
//     const id = req.body.id;
//     const em = await EngineeringManager.findById(id);
//     res.status(201).json({
//         successMessage:"It's working fine!",
//         saaleKaPassword: em.password,
//     })
// });

//login user
exports.loginEM_User= catchAsyncError( async (req,res,next)=>{
  console.log("aaya");
  const {username,password} = req.body;

  if(!username || !password){
      // console.log("aya");
      return next(new ErrorHandler("Please enter username and password",400));
  }
  
  const userFound= await EngineeringManager.findOne({username: username}).select("+password");

  if(!userFound){
      return next(new ErrorHandler("Invalid username or password",400));
  }
  const isPasswordMatched= await userFound.comparePassword(password);

  if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid username or password",400));
  }
  
  sendToken(userFound,200,res);
});


//logout em user!!
exports.logoutEM_User = catchAsyncError( async (req,res,next)=>{
  res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true,
  });

  res.status(200).json({
      success:true,
      message:"Successfully logged out",
  });
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

exports.getAllTeams = catchAsyncError(async(req,res,next)=>{
  const teams = await Team.find({});
  
  res.status(201).json({
  success: true,
  teams,
  });
});

exports.getAllTeamMembers = catchAsyncError( async (req,res,next)=>{
  const teammembersCount= await TeamMember.countDocuments({team:null});
    
  const teammembers= await TeamMember.find({team:null});
  res.status(200).json({
      success: true,
      teammembersCount,
      teammembers,
  });
});