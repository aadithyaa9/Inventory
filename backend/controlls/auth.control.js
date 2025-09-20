import User from "../models/user.model.js"


export const signup = async(req , res)=>{
    const {email , password , name} = req.body
    const userExists = await User.findOne({email})
    if (userExists){
        return res.status(400).json({message : "User Already Exists"})
    }

    const user =  await User.create({name,email,password})
    res.status(201).json({user , message:"User Created Successfully"})
}

export const Login = async(req,res)=>{
    res.send("Login called")
}

export const Logout = async(req,res)=>{
    res.send("Logged Out successfully");
}