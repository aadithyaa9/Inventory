import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        enum:["Customer" , "Admin"],
        default:"Customer"
    }
} , {
    timestamps:true
})

userSchema.pre("save" , async function(next){
    if (!this.isModified("password")){
        return next()
    }

    try{
        const gen1 = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password , gen1);
        next();
    }
    catch(error){
        next(error);
    }
})


userSchema.methods.comparer = async function(password){
    return bcrypt.compare(password , this.password)
}
const User = mongoose.model("User" , userSchema);
export default User;