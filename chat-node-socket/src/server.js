const express = require("express");
const UserRouter = require("./router/userRouter");
const mongoose = require('mongoose');
const cors = require('cors');
class Server{
    app = express();

    constructor(){
        this.setConfiguration();
        this.setRouter();
        this.error404Handle();
        this.errorHandler();
    }

  
    setConfiguration(){
        this.setBodyPareser();
        this.setDatabaseConection();
        this.setCore();
     }

     setCore(){
      const corsOptions = {
        "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
      }
  
      // const serverCores = {
      //   credentials: true,
      //   'Access-Control-Allow-Origin':'http://myDomain:8080',
      //   'Access-Control-Allow-Methods':'POST,OPTIONS,PUT,DELETE',
      //   'Access-Control-Allow-Headers':'Content-Type,Accept',
         // "optionsSuccessStatus": 204
      // }
  
      this.app.use(cors(corsOptions))
   
    }

     setBodyPareser(){
        this.app.use(express.json());
     }
     setDatabaseConection(){
        const urlDb = "";
      mongoose.connect(urlDb).then(() => {
        console.log("mongoose connct");
      });
     }


     setRouter(){
        this.app.use("/api/user",UserRouter)
     }

     error404Handle(){
        this.app.use((req,res)=>{
            res.status(404).json({status:404,message:"pages not found"})
        })
     }

     errorHandler(){
        this.app.use((error,req,res,next)=>{
            console.log("error -handle",error)
            const errorStatus = error.status || "500";
            const errorMessage =
              error.message || error || "Something Went Wrong Plz Try Again";
            res
              .status(errorStatus)
              .json({ message: errorMessage, status: errorStatus });
          });
        
     }
    
}


module.exports = new Server().app;
