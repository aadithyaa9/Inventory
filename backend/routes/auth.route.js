import express from "express";
import { signup, Login , Logout } from "../controlls/auth.control.js";

const router = express.Router()

router.post("/signup" , signup);

router.post("/Login" , Login)

router.post("/logout" , Logout);
export default router;



//hsVLcCXgReFO78tD