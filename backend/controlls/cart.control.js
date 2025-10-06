import Product from "../models/product.model.js"

export const addToCart = async(req , res) =>{
    try{
        const {productID}  =req.body
        const user = req.user
        const existingItem = user.cartItems.find((item) =>item.id === productID)
        if (existingItem){
            existingItem.quantity +=1
        }
        else{
            user.cartItems.push(productID)
        }


    await user.save()
    res.json(user.cartItems)
    res.status(201).json({message : "Successfully added so FARR"})
    }catch(error){
        res.status(500).json({message:"Error with the server" , error:error.message})
    }
}

export const deleteCart = async(req,res)=>{
    try{
        const user = req.user
        const {productID} = req.body

        if(!productID){
            user.cartItems = []

        }

        else{
            user.cartItems = user.cartItems.filter((item)=>item.id !== productID)
        }

        await user.save()

        res.json(user.cartItems)
        res.status(201).json({message:"Current Stock So Farr"})
    }
    catch(error){
        res.status(500).json({message : "Error with the server" , error:error.message})
    }
}

export const updateCart = async(req,res)=>{
    try{
        const user = req.user
        const {productID} = req.params
        const {quantity} = req.body
        const existingItem = user.cartItems.find((item) =>item.id === productID)
        if (existingItem){
            if (quantity === 0){
                user.cartItems = user.cartItems.filter((item)=>item.id !== productID)
                await user.save()
                return res.json(user.cartItems)
            }

            existingItem.quantity = quantity
            await user.save()
            res.json(user.cartItems)
        }

        else{
            res.status(404).json({message : "Product not found"})
        }   
    }
    catch(error){
        res.status(500).json({message : "Internal Server Error"})
    }
}

export const getCartItems = async(req ,res)=>{

    try{
        const user = req.user
        const products = await Product.find({_id:{$in : req.user.cartItems}})
        const items = products.map((product)=>{
            const item1 = req.user.cartItems.find((item) => item.id === product.id)
            return {
            ...product.toJSON(),quantity:item1.quantity
        }
    })

        

    res.json(items)
}catch(error){
    res.status(500).json({error: error.message})

}
}