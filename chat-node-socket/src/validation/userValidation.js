const { body } = require('express-validator');
const User = require("../model/userModel");
const { Error } = require('mongoose');
const chat = require('../model/chatModel');

module.exports = class UserValidation{
    
    static UserLogin(req,next){
        try{
          return[
            body("email", "Email Is Required")
          .notEmpty()
          .isEmail()
          .custom((email, { req }) => {
            return User.findOne({ email: email }).then((user) => {
              if (user) {
                req.user = user
               
              } else {

                throw new Error("Email All Ready Exit");
                
              }
            });
          }),
        
            body("password","Password is required").not().isEmpty().isString()          ]
        }catch(err){
            throw new Error(err)
        }
    }

    static sendMessage(){
      return [
         body('sender_id','SenderId is required').notEmpty()
         .custom(async(sender_id)=>{
          return User.findOne({ _id: sender_id }).then((user) => {
            if (user) {
             return true;
            } else {
              throw new Error("user id not  Exit");
            }
          });
         }),
         body('receiver_id','ReceiverId is required').notEmpty()
         .custom(async(receiver_id)=>{
          return User.findOne({ _id: receiver_id }).then((user) => {
            if (user) {
             return true;
            } else {
              throw new Error("user id not  Exit");
            }
          })
         })
      ]
    }

    static getSingleChatMessage(){
      return [
        body('sender_id','SenderId is required').notEmpty()
        .custom(async(sender_id,{req})=>{
          
          
          if(chatMesage.length>0){
            req.chatData = chatMesage
          }else{
            req.chatData = []
          }
        })
      ]
    }
    static register(){
      
        return[
          body("email", "Email Is Required")
        .notEmpty()
        .isEmail().withMessage("Enter valid Email")
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              throw new Error("Email All Ready Exit");
             
            } else {
              return true;
            }
          });
        }),
          body("name", "Name Is Required").not().isEmpty().isString(),
          body("password","Password is required").not().isEmpty().isString(),
          body("mobile","mobile is required").not().isEmpty(),      
                ]
      
  }



    
}