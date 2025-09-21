import express from "express";
import {protectRoute , adminRoute} from "../middlewares/auth.middleware.js"
import {getAllProducts} from "../controlls/product.control.js"

const router = express.Router()

router.get("/" , protectRoute , adminRoute , getAllProducts);

export default router;