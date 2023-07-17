
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError= require("../middleware/catchAsyncErrors");


exports.testingFunction= catchAsyncError(async(req,res,next)=>{

    res.status(201).json({
        successMessage:"It's working fine!"
    })
});