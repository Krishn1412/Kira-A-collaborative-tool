const express=require('express');
const {createEngineeringManager,testingFunction,assignTeam } = require('../controllers/emController');
// const { testingFunction } = require('../controllers/ticketController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createEngineeringManager").post(createEngineeringManager);
router.route("/createEngineeringManager/testing").post(testingFunction);
router.route("/EngineeringManager/assignTeam").post(assignTeam);

module.exports=router