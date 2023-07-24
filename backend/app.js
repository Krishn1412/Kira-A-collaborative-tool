const express=require("express");
const app=express();
const error_middleware= require("./middleware/error");
const cookieParser= require("cookie-parser");
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
    credentials: true, // Allow credentials (cookies) to be sent with the request
  };

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

//importing all routes
const ticket= require("./routes/ticketRoute");
const em= require("./routes/emRoutes");
const pm= require("./routes/pmRoutes");
const team= require("./routes/teamRoutes");
const teamMem= require("./routes/teamMemberRoutes");
// const user= require("./routes/userRoute");
// const order = require("./routes/orderRoute");

//actiavting routes
app.use("/api/v1",ticket);
app.use("/api/v1",em);
app.use("/api/v1",pm);
app.use("/api/v1",team);
app.use("/api/v1",teamMem);
// app.use("/api/v1",user);
// app.use("/api/v1",order);
app.use(error_middleware);



module.exports=app;