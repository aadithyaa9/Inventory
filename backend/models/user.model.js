import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true , "Please Enter Your Name"]
    },
    email:{
        type:String,
        required : [true , "Email is a required Field"],
        trim:true,
        unique:true ,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[7 , "Password should have at least 7 letters"]
    },
    cartItems:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    role:{
        type:String,
        enum:["Customer" , "Admmin"],
        default:"Customer"
    }
} , {
    timestamps:true
})



const User = mongoose.model("User" , userSchema);
export default User;