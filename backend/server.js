const app=require("./app")
const dotenv=require("dotenv");

const connecttDatabase= require('./config/database') //function we wrote to connect

dotenv.config({path:"backend/config/config.env"});



process.on("uncaughtException",err=>{
    console.log(`error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception `);

    process.exit(1);

})


connecttDatabase();



const server=app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})






process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection `);

    server.close(()=>{
        process.exit(1);
    })
})