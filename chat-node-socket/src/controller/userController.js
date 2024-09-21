

const Utils = require("../Utils/utils");
const UserService = require("../service/userService");
const chat = require("../model/chatModel")
const cloudinary = require('cloudinary').v2;

module.exports = class UserController{


    static async chatFileUploaded(req,res,next){
        try{
            console.log("req.file ",req.file)
            cloudinary.config({ 
                cloud_name: 'db0l6aajq', 
                api_key: '219797798643958', 
                api_secret: '0INxv9t6i9Kb5PL7EU9kDTTeWck' 
              });

           const url = await cloudinary.uploader.upload(req.file?.path)
           const sendRes = {
            status:200,
            data:url?.secure_url,
            message:"images uploaded successfully "
          }
              res.send(sendRes)
        }catch(err){
            next(err);
        }
    }


    static async userUpdate(req,res,next){
        try{
           const userData = req.body;
           const resData =await UserService.userUpdate(userData);
            res.send(resData)
        }catch(err){
          next(err)
        }
    }
    static async userLogin(req,res,next){
        try{
             let userData = req.user;
            // console.log(" userData",userData)
              const checkPassword = await Utils.checkPassword(req.body.password,userData.password);
             // console.log(" checkPassword",checkPassword)
             if(checkPassword){
                const token =await Utils.generate(userData);
                console.log(" token",token)
                const resData = {
                    status:200,
                    token,
                    data:userData,
                    message:"user login successfully"
                }
               res.send(resData)
             }else{
                const err = {
                    status:400,
                    message:"Invalid password"
                }
                next(err)
             }
           
        }catch(err){
            next(err)
        };
    }

    static async getSingleChatMessage(req,res,next){
        const messageData = {
            
                receiver_id:"65054ce93138c4799009d7c7",
                sender_id:"650d3d04f35942665156d200"
            
        }
        try{
            let page = Math.max(0, req.body.page);
            const chatMesage = await chat.find({
                $or: [
                    { sender_id: req.body.sender_id, receiver_id: req.body.receiver_id },
                    { sender_id: req.body.receiver_id, receiver_id: req.body.sender_id }
                  ]
            }).limit(10).skip(((page - 1) * 10) * page).sort({createdAt:-1});
            console.log("chatMesage ",chatMesage)
           let sendRes;
           if(chatMesage.length>0){
            sendRes = {
              status:200,
               data:chatMesage,
              message:"all message "
            }
           }else{
            sendRes = {
              status:500,
              message:"data not found"
            }
        }
            res.send(sendRes)
           
        }catch(err){
            next(err)
        }
    }

   static async sendMessage(req,res,next){
     try{
      const messageData = req.body;
      const resData =await UserService.sendMessage(messageData);
      res.send(resData)
      
     }catch(err){
        next(err)
     }
   }


    static async userDelete(req,res,next){
        try{
           const userId = req.params.id;
           const resData =await UserService.userDelete(userId);
            res.send(resData)

        }catch(err){
            next(err)
        }
    }

    static async userList(req,res,next){
        try{
            const pages = req.params.pages;
            const userId = req.params.userId
            const resData =await UserService.userList(pages,userId);
            res.send(resData)
        }catch(err){
            next(err);
        }
    }


    static async register(req,res,next){
        try{
            let userData = req.body;
            userData['password'] = await Utils.hashPassword(userData.password)
            const resData =await UserService.register(userData);
            res.send(resData)
        }catch(err){
            next(err)
        };
    }

    
}