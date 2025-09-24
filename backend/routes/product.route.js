import express from "express";
import {protectRoute , adminRoute} from "../middlewares/auth.middleware.js"
import {getAllProducts , getFeaturedProducts , UploadProducts , detleteProduct, getRecommendations ,filterProducts , featureUpdate} from "../controlls/product.control.js"

const router = express.Router()

router.get("/" , protectRoute , adminRoute , getAllProducts);
router.get("/featured" , getFeaturedProducts)
router.patch("/" , protectRoute , adminRoute , UploadProducts)
router.delete("/:id" , protectRoute , adminRoute, detleteProduct);
router.get("/recommendation" , getRecommendations)
router.get("/category/:category" , filterProducts)
router.patch("/:id" , protectRoute ,adminRoute , featureUpdate)
export default router;