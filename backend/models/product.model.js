import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name:{
        type:String ,
        required :true
    },
    description:{
        type:String,
        required :true
    },
    category:{
        type:String,
        required : true
    },
    price:{
        type:Number,
        required : true,
        min:0
    },
    image:{
        type:String,
        required:[true , "Please Provide The Image"]
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{
    timestamp : true
})



const Product = mongoose.model("Product" , productSchema)

export default Product