import { v2 as cloudinary} from "cloudinary";


import dotenv from "dotenv"


dotenv.config()


cloudinary.config({
    cloud:process.env.CLOUD_NAME,
    apikey:process.env.CLOUD_API_KEY,
    secret:process.env.CLOUD_API_KEY_SECRET
})


export default cloudinary   