const express=require('express');
const { testingFunction,ViewSingleTicket, createTicket, assignTicket } = require('../controllers/ticketController');
// const {isAuthUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();

router.route("/ticket/testing").get(testingFunction);
router.route("/ticket/productManager/viewTicket/:id").get(ViewSingleTicket);
router.route("/ticket/productManager/createTicket").post(createTicket);
router.route("/ticket/productManager/assignTicket").post(assignTicket);

module.exports=router