const express=require('express');
const {createTeam, viewTeamTickets, viewTeamMems } = require('../controllers/teamController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createTeam").post(createTeam);
router.route("/viewTeamTickets").post(viewTeamTickets);
router.route("/viewTeamMembers").post(viewTeamMems);

module.exports=router