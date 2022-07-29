const express= require ("express");
const app= express();
const mongoose= require ("mongoose")
const dotenv= require("dotenv");

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error")
app.use(express.json()); 
app.use(cookieParser()); 

const product = require("./router/productRoute.js");
const user =require("./router/userRoute");
// const order =require("./router/orderRoute");

/*Config*/
dotenv.config({path:"./config.env"});

require("./db/conn");
/* Connecting to database*/



app.use("/api/v1",product);
app.use("/api/v1", user);
// app.use("/api/v1", order);



const PORT=process.env.PORT;



 const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });

// middleware for error
app.use(errorMiddleware)
  //unhandled Promise request
  process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection");
    server.close(()=>{
      process.exit(1);
    })
  })
  // handling Uncaught Exception
process.on("uncaughtException",()=>{
  console.log(`error:${err.message}`);
  console.log("shutting down the server due to uncaught Exception");
  process.exit(1);
  

})