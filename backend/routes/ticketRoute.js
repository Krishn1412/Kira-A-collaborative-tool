const express=require('express');
const { ViewAllTickets,ViewUnassignedTickets, createTicket, assignTicket } = require('../controllers/ticketController');
const {  isAuthUser_PM } = require('../middleware/auth');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();


router.route("/ticket/viewAllTickets").get(ViewAllTickets);
router.route("/ticket/viewUnassignedTickets").get(ViewUnassignedTickets);

router.route("/ticket/productManager/createTicket").post(isAuthUser_PM,createTicket);
router.route("/ticket/productManager/assignTicket").post(isAuthUser_PM,assignTicket);

module.exports=router