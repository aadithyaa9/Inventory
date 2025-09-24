import Product from "../models/product.model.js"
import { redis } from "../library/redis.js"
import cloudinary  from "../library/cloudinary.js"

export const getAllProducts = async(req , res) =>{
    try{
        console.log("As of now this is the update")
        const allProducts = Product.find({})
        res.json({allProducts})
    }
    catch(error){
        console.log("Error fetching all the product , please check again" , error.message)
        res.status(500).json({message:"serverError"})
    }
}


export const getFeaturedProducts = async(req , res) =>{
    try{
        let products = await redis.get("featured_Products")
        if (products){
            return res.json(JSON.parse(products))
        }
        products = await Product.find({isFeatured: true}).lean()

        if (!products){
            return res.status(400).json({message : "There are no featured Items"})
        }
        await redis.set("featured_Products" , JSON.stringify(products))

        res.json({products})
    }
    catch(error){
        console.log("ERROR FETCHING FEATURED PRODUCTS , UNEXPECTED ERROR OCCURED")
        res.status(500).json({message : "Server Error"})
    }
}

export const UploadProducts = async(req,res)=>{
    try{
        const {name , description , price , image ,category} = req.body;
        let cloudresp = null;
        if(image){
            cloudresp = await cloudinary.uploader.upload(image , {folder:"Product"})
        }
        const item = await Product.create({
            name,description ,price,image:cloudresp?.secure_url ? cloudresp?.secure_url : "" ,category
        })

        res.status(201).json({item})
    }catch(error){
        console.log("Difficulty in uploading the product")

        res.status(500).json({message:"ServerError" , error:error.message})

    }
}


export const detleteProduct = async(req,res)=>{
    try{

        const {id} = req.params.body;
        const tobeDeleted = await Product.findById({id})

        if (!tobeDeleted){
            return res.status(404).json({message : "Product not found"})
        }

        if(tobeDeleted.image){
            const path = tobeDeleted.image.split("/").pop().split(".")[0]
            try{
                await cloudinary.uploader.destroy(`products/${path}`)

            }catch(error){
                return res.status(404).json({message : "Product image not found"})
            }
        }

        await Product.findByIdAndDelete(req.params.id)

        res.json({message:"Product deleted Succefully"})

    }catch(error){
        console.log("THIS IS THE ERROR I AM GETTING , WHICH MEANS ERROR IN FINDING THE RIGHT ID FOR THE PROJECT")
        res.status(500).json({message:"Errror message" , error:error.message})
    }
}

export const getRecommendations = async(req,res)=>{
    try{
        const products = await Product.aggregate([
            {
                $sample:{size:3},
            },

            {
                $project:{
                    _id:1,price:1
                }
            }
        ])

        res.json(products)
    }
    catch(error){
        console.log("ERROR recommending the products to both the user and the admin as well")
        res.status(500).json({message:"Errror message" , error:error.message})
    }
}
