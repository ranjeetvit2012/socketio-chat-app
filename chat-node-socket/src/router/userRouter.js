const { Router } = require("express");
const UserController = require("../controller/userController");
const UserValidation = require("../validation/userValidation");
const Utils = require("../Utils/utils");
const ErrorHandler = require("../globalMiddleware/errorHandle")
const upload = require("../Utils/imagesUpload")
 

 class UserRouter{

  constructor(){
    this.router = Router();
    this.getRouter();
    this.postRouter();
    this.putRouter();
    this.patchRoter();
    this.deleteRouter()
  }


  getRouter(){
 
    this.router.get("/user-list/:pages/:userId",
    Utils.verifyToken,
    UserController.userList)
  }

  postRouter(){
    this.router.post("/send-message",
    Utils.verifyToken,
    UserValidation.sendMessage(),
    ErrorHandler.handelError,
    UserController.sendMessage)

    this.router.post("/get-single-chat-message",
   // Utils.verifyToken,
    //UserValidation.getSingleChatMessage(),
    ErrorHandler.handelError,
    UserController.getSingleChatMessage
   )

   // UserController.getSingleChatMessage

    this.router.post("/login",
    //Utils.verifyToken,
    UserValidation.UserLogin(),
    ErrorHandler.handelError,
    UserController.userLogin)

    this.router.post("/register",
    UserValidation.register(),
    ErrorHandler.handelError,
   UserController.register)

   this.router.post("/chat-file",
   upload.single('file'),
   UserController.chatFileUploaded)

 
  }
  putRouter(){

  }
  patchRoter(){
   this.router.patch("/user-update",
   Utils.verifyToken,
     UserController.userUpdate)
  }
  deleteRouter(){
   this.router.delete(
    "/user-delete/:id",
    Utils.verifyToken,
     UserController.userDelete
    )
  }
}
 
module.exports =  new UserRouter().router;