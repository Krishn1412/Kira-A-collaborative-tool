const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt= require("jsonwebtoken");
const EM= require("../models/emModel");
const PM= require("../models/pmModel");
const TM= require("../models/teamMemberModel");

exports.isAuthUser_EM= catchAsyncError( async (req,res,next)=>{
    const userInfoCookie = req.cookies['userInfo'];
  
    if (!userInfoCookie) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }
  
    const userInfo = JSON.parse(decodeURIComponent(userInfoCookie));
    const { token } = userInfo;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",400));
    }

    const decodedData= jwt.verify(token, process.env.JWT_SECRET);

    req.user = await EM.findById(decodedData.id);

    next();
});
exports.isAuthUser_PM= catchAsyncError( async (req,res,next)=>{
    const userInfoCookie = req.cookies['userInfo'];
  
    if (!userInfoCookie) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }
  
    const userInfo = JSON.parse(decodeURIComponent(userInfoCookie));
    const { token } = userInfo;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",400));
    }

    const decodedData= jwt.verify(token, process.env.JWT_SECRET);

    req.user = await PM.findById(decodedData.id);

    next();
});
exports.isAuthUser_TM = catchAsyncError(async (req, res, next) => {
    const userInfoCookie = req.cookies['userInfo'];
  
    if (!userInfoCookie) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }
  
    const userInfo = JSON.parse(decodeURIComponent(userInfoCookie));
    const { token } = userInfo;
  
    // console.log(req.cookies);
    // console.log(token);
  
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }
  
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await TM.findById(decodedData.id);
      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  });
  
exports.authorizeRoles = (...roles) =>{

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){ // if array contains the role of the current user logged in through cookie
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource `,403
            ));
        }
        next(); //if he is admin, then simply call next redirect
    };
};