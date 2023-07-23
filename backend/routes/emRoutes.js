const express=require('express');
const {createEngineeringManager,testingFunction,assignTeam, loginEM_User, logoutEM_User, getAllTeamMembers,getAllTeams } = require('../controllers/emController');
const { isAuthUser_EM } = require('../middleware/auth');
// const { testingFunction } = require('../controllers/ticketController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createEngineeringManager").post(createEngineeringManager);
router.route("/EngineeringManager/assignTeam").post(assignTeam);

router.route("/ViewAllUnassignedTeamMembers").get(getAllTeamMembers);
router.route("/ViewTeams").get(getAllTeams);

router.route("/login/em").post(loginEM_User);
router.route("/logout/em").get(logoutEM_User);

module.exports=router