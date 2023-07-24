module.exports = findu=>(req,res,next)=>{
    Promise.resolve(findu(req,res,next)).catch(next);
};