const express=require('express');
const {createEngineeringManager,testingFunction,assignTeam, loginEM_User, logoutEM_User, getAllTeamMembers } = require('../controllers/emController');
const { isAuthUser_EM } = require('../middleware/auth');
// const { testingFunction } = require('../controllers/ticketController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createEngineeringManager").post(createEngineeringManager);
router.route("/EngineeringManager/assignTeam").post(isAuthUser_EM,assignTeam);

router.route("/ViewAllTeamMembers").get(isAuthUser_EM,getAllTeamMembers);

router.route("/login/em").post(loginEM_User);
router.route("/logout/em").get(logoutEM_User);

module.exports=router