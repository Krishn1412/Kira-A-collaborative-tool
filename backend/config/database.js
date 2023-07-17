const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:"./config.env"})


const connectDatabase = ()=>{
    mongoose
    .connect(process.env.URL,{useNewUrlParser: true,useUnifiedTopology: true,family: 4})
    .then((data)=>{
        console.log(`Successfully connected to database at ${data.connection.host}`);
    });
};

module.exports = connectDatabase


