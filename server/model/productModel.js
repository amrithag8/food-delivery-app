const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    productName:{type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productDesc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("Products", productSchema);