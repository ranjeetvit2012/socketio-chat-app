var jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt');
module.exports = class Utils{

    static async generate(data){
        try{
           const token = await jwt.sign({data: data,}, 'RS256', { expiresIn: "60 days" });
           return token;
        }catch(err){
            next(err);
        }
    }

    static async verifyToken(req,res,next){
    try{
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        const token = req.headers.authorization.split(' ')[1];
            const decodeToken = await jwt.verify(token, 'RS256');
            if(decodeToken){
                next();
                return req.user = decodeToken;
            }

    }else{
        const tokemError={message:"token is empty",status:401};
        
        next(tokemError);
        //res.send(tokemError)
    }
    }catch(err){
        next(err)
    }
    }
    static async  hashPassword(password){
        try{
         const hashPassword = await bcrypt.hash(password, saltRounds)
        if(hashPassword){
        return hashPassword;
        }
        }catch(err){
            console.log("err",err)
        }
    }

    static async checkPassword(plainPassword,hash){
    try{
       const password = await bcrypt.compare(plainPassword, hash);
       if(password){
        return password
       }
    }catch(err){
     next(err);
    }
    }

}