const express=require('express');
const { testingFunction,ViewSingleTicket, createTicket, assignTicket } = require('../controllers/ticketController');
const {  isAuthUser_PM } = require('../middleware/auth');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();

router.route("/ticket/testing").get(testingFunction);
router.route("/ticket/viewTicket/:id").get(ViewSingleTicket);
router.route("/ticket/productManager/createTicket").post(isAuthUser_PM,createTicket);
router.route("/ticket/productManager/assignTicket").post(isAuthUser_PM,assignTicket);

module.exports=router