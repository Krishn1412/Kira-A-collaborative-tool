const Team= require('../models/teamModel.js');
const TeamMember= require('../models/teamMemberModel.js');
const Ticket= require('../models/ticketModel.js');
const PM= require('../models/pmModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");


exports.viewTeamTickets = catchAsyncError(async(req,res,next)=>{
  //i have team id 
    const teamMems = await TeamMember.find({ team: req.body.teamId });

     
    const allTickets = [];
    for (const teamMember of teamMems) {
      for(const ticket of teamMember.ticket){
        const ticketBha = await Ticket.findById(ticket);
        // console.log(ticketBha);
        allTickets.push(ticketBha);
      }
    }
    res.status(201).json({
      success: true,
      allTickets,
    });
    
  });

  exports.viewTeamMems = catchAsyncError(async(req,res,next)=>{
    //i have team id 
      const teamMems = await TeamMember.find({ team: req.body.teamId });
  
      
      res.status(201).json({
        success: true,
        teamMems,
      });
      
    });

exports.createTeam = catchAsyncError(async(req,res,next)=>{
  
const pmWithNullTeam = await PM.findOne({ team: null });
// console.log(pmWithNullTeam)
  const team_json={
    "name":req.body.name,
    "engineeringManager":req.body.engineeringManager,
    "productManager":pmWithNullTeam._id
  }
  const team = await Team.create(team_json);
   
  pmWithNullTeam.team = team._id;

  await team.save({ validateBeforeSave: false });
  await pmWithNullTeam.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    team,
    pmWithNullTeam,
  });
});
