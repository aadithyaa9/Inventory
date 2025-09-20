import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { redis } from "../library/redis.js"


const generateTokens = (userId) =>{
    const accessToken = jwt.sign({userId} , process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m",
    })

    const refreshToken = jwt.sign({userId} , process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d"
    })

    return {accessToken , refreshToken}
}

const storeRefreshTokens = async (userId, refreshToken) => {
  console.log("is it here");
  try {
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    await redis.set(`refresh_token:${userId}`, refreshToken, {
      EX: sevenDaysInSeconds
    });
    
  } catch (error) {
    console.error("Failed to store refresh token in Redis:", error);
  }
};
const setCookies=(res , accessToken , refreshToken)=>{
    res.cookie("accessToken" , accessToken , {
        httpOnly : true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:15*60*1000   

    })

    res.cookie("refreshToken" , refreshToken , {
        httpOnly : true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000   

    })
}

export const signup = async(req , res)=>{
    const {email , password , name} = req.body
    try {
        const userExists = await User.findOne({email})
    if (userExists){
        return res.status(400).json({message : "User Already Exists"})
    }

    const user =  await User.create({name,email,password})
    const {accessToken , refreshToken} = generateTokens(user._id)

    await storeRefreshTokens(user._id ,refreshToken)   

    setCookies(res , accessToken , refreshToken)

    res.status(201).json({user:{name:user._id , name:user.name , email:user.email , role: user.role} , message:"User Created Successfully"})
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const Login = async(req,res)=>{
    try{
        const {email , password} = req.body
        const user = await User.findOne({email})
        if (user && (await user.comparer(password))){
            const {accessToken , refreshToken} = generateTokens(user._id)
            await storeRefreshTokens(user._id , refreshToken)
            setCookies(res , accessToken , refreshToken)

            res.json({
                _id : user._id,
                name: user.name,
                role: user.role
            })
        }
        else{
            res.status(401).json({message : "Invalid Email or Password"});
        }
    }catch(error){
        res.status(500).json({message : "Server Error"  , error : error.message})
    }
}

export const Logout = async(req,res)=>{
    try{
        const refreshToken = req.cookies.refreshToken
        if (refreshToken){
            const decoded = jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET)
            await redis.del(`refresh_token:${decoded.userId}`)
        }

        res.clearCookie("accessToken");
        res.clearCookie("refrestToken");
        res.status(200).json({message:"person logged out successfully"})
    }catch(error){
        res.status(500).json({message:"Server Error" , error:error.message})
    }
}