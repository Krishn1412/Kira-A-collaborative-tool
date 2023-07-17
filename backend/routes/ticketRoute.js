const express=require('express');
const { testingFunction } = require('../controllers/ticketController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();

router.route("/ticket/testing").get(testingFunction);


module.exports=router