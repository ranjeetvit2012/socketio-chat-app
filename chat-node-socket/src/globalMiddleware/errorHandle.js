
const {validationResult} = require("express-validator");

class ErrorHandler{

    static handelError(req,res,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
       const err = {message:errors.array()[0].msg,status:400};
            next(err);  
        }
        next()
    }

}

module.exports  = ErrorHandler