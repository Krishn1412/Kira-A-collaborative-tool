const Team= require('../models/teamModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");


exports.testingFunction= catchAsyncError(async(req,res,next)=>{

    res.status(201).json({
        successMessage:"It's working fine!"
    })
});

exports.createTeam = catchAsyncError(async(req,res,next)=>{
//   const productManagerId= req.params.id;
//   const productManager = await Ticket.findById(req.params.id);
  const team = await Team.create(req.body);

  res.status(201).json({
    success: true,
    team,
  });
});
