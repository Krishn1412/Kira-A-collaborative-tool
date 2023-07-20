const express=require('express');
const { createTeamMember,updateStatus} = require('../controllers/teamMemberController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/EngineeringManager/createTeamMember").post(createTeamMember);
router.route("/TeamMember/updateStatus").post(updateStatus);

module.exports=router