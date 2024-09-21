const mongoose =require("mongoose");



const productSchema = new mongoose.Schema({
productName :{type:String,required: true},
productDescription:{type:String,required: true},
image:{type:String,required: true},
price:{type:Number,requeid:true}
})


const product = mongoose.model("product",productSchema)
module.exports = product