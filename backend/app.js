const express=require("express");
const app=express();
const error_middleware= require("./middleware/error");
const cookieParser= require("cookie-parser");
const cors = require('cors');


app.use(cors());
app.use(express.json())
app.use(cookieParser())

//importing all routes
const ticket= require("./routes/ticketRoute");
// const user= require("./routes/userRoute");
// const order = require("./routes/orderRoute");

//actiavting routes
app.use("/api/v1",ticket);
// app.use("/api/v1",user);
// app.use("/api/v1",order);
app.use(error_middleware);



module.exports=app;