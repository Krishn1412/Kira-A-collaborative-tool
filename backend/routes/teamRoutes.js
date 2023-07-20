const express=require('express');
const {createTeam } = require('../controllers/teamController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createTeam").post(createTeam);

module.exports=router