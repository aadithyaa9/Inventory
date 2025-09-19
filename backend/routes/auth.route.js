import express from "express";
import { signup, Login , Logout } from "../controlls/auth.control.js";

const router = express.Router()

router.get("/signup" , signup);

router.get("/Login" , Login)

router.get("/logout" , Logout);
export default router;



//hsVLcCXgReFO78tD