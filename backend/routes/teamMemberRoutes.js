const express=require('express');
const { createTeamMember,updateStatus,loginTM_User,logoutTM_User, viewAssignedTickets} = require('../controllers/teamMemberController');
const {isAuthUser_TM}=require("../middleware/auth");

const router=express.Router();


router.route("/EngineeringManager/createTeamMember").post(createTeamMember);
router.route("/TeamMember/viewTickets").post(viewAssignedTickets);
router.route("/TeamMember/updateStatus").post(isAuthUser_TM,updateStatus);

router.route("/login/tm").post(loginTM_User);
router.route("/logout/tm").get(logoutTM_User);

module.exports=router