const express=require('express');
const {createProductManager ,loginPM_User , logoutPM_User } = require('../controllers/pmController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/createProductManager").post(createProductManager);

router.route("/login/pm").post(loginPM_User);
router.route("/logout/pm").get(logoutPM_User);

module.exports=router