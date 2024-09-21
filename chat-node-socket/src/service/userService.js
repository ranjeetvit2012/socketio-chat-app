const user = require("../model/userModel")
const product =require("../model/productModel")
const chat = require("../model/chatModel")
module.exports = class UserService{
   
    static async userUpdate(data){
      try{ 
        const userRes = await user.findOneAndUpdate({_id:data.id},data,{new: true,upsert: true });
        let sendRes 
           if(userRes){
            sendRes = {
              status:200,
              message:"user update successfully "
            }
           }else{
            sendRes = {
              status:500,
              message:"some technocal problem"
            }
           }
           return sendRes
      }catch(err){
        throw new Error(err);
      }
    }

    static async sendMessage(data){
       const chatRes = await new chat(data);
        const resChat = await chatRes.save();
        let sendRes 
        if(resChat){
         sendRes = {
           status:201,
            data:resChat,
           message:"message save  "
         }
        }else{
         sendRes = {
           status:500,
           message:"some technocal problem"
         }
        }
        return sendRes
        
    }

  static async userList(pages,userId){
    try{
     const  page = pages;
     const limit = 10;
      //const resSave = await user.find().select("_id name email mobile");
      const [{paginatedResult,  totalCount }] = await user.aggregate(
        [ 
        {
        // $match:{
        //   _id: { $ne: userId }
        // },
        $facet: {
          paginatedResult: [
            { $skip: ((page - 1) * limit) },
            { $limit: limit * 1 }
          ],
          totalCount: [
            { $count: 'totalCount' }
          ]
        }
      }]
      )
      
      let sendRes 
      if(paginatedResult.length>0){
          const [count] = totalCount;
          const pages =Math.ceil(count?.totalCount/limit);
          // (int) Math.Ceiling((double) imagesFound.Length / PageSize);

       sendRes = {
         status:200,
         data:paginatedResult,
         totalCount:pages,
         message:" user List  "
       }
      }else{
       sendRes = {
         status:200,
         data:[],
         totalCount:0,
         message:"data not found"
       }
      }
      return sendRes
   }catch(err){
       throw new Error(err)
   }
  }


  static async userDelete(id){
    try{
      const userRes = await user.findOneAndDelete({_id:id});
      let sendRes 
         if(userRes){
          sendRes = {
            status:200,
            message:"user delete successfully "
          }
         }else{
          sendRes = {
            status:500,
            message:"some technocal problem"
          }
         }
         return sendRes
    }catch(err){
      throw new Error(err)
    }

  }
    

    static async userLog(data){
        try{
           const resSave = new user(data);
           const userRes = resSave.save();
           let sendRes 
         if(userRes){
          sendRes = {
            status:200,
            data:userRes,
            message:"user login successfully "
          }
         }else{
          sendRes = {
            status:500,
            data:[],
            message:"some technocal problem"
          }
         }
         return sendRes
        }catch(err){
            next(err);
        }
    }


    
    static async register(data){
        try{
           const resSave = new user(data);
           const userRes = await resSave.save();
           delete userRes.password;

           let sendRes 
         if(userRes){
          sendRes = {
            status:201,
            data:userRes,
            message:"user register successfully "
          }
         }else{
          sendRes = {
            status:500,
            data:[],
            message:"some technocal problem"
          }
         }
         return sendRes
        }catch(err){
            next(err);
        }
    }

   

    
}