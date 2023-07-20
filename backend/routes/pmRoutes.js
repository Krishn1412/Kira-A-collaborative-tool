const express=require('express');
const {createProductManager } = require('../controllers/pmController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createProductManager").post(createProductManager);

module.exports=router