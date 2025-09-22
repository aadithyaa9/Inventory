import Product from "../models/product.model.js"
import { redis } from "../library/redis.js"

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