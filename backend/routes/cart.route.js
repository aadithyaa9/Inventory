import express from "express"

import { protectRoute } from "../middlewares/auth.middleware.js"
import { addToCart ,deleteCart , updateCart ,getCartItems} from "../controlls/cart.control.js"

const router = express.Router()

router.get("/" , protectRoute , getCartItems)
router.post("/" , protectRoute , addToCart)
router.delete("/" , protectRoute , deleteCart)
router.put("/:id" , protectRoute , updateCart)



export default router

