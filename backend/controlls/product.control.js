import Product from "../models/product.model.js"

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