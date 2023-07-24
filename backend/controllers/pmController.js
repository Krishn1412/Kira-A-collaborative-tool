
const ProductManager= require('../models/pmModel.js');
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwtToken.js');

//login user
exports.loginPM_User= catchAsyncError( async (req,res,next)=>{
    
  const {username,password} = req.body;

  if(!username || !password){
      return next(new ErrorHandler("Please enter username and password",400));
  }
  
  const userFound= await ProductManager.findOne({username: username}).select("+password");

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
exports.logoutPM_User = catchAsyncError( async (req,res,next)=>{
  res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true,
  });

  res.status(200).json({
      success:true,
      message:"Successfully logged out",
  });
});

exports.createProductManager = catchAsyncError(async(req,res,next)=>{
  const pm = await ProductManager.create(req.body);

  res.status(201).json({
    success: true,
    pm,
  });
});
