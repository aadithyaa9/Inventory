import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"

const app = express();

dotenv.config()

const PORT=process.env.PORT || 3000
app.use(express.json())
app.use("/api/auth" , authRoutes)

app.listen(PORT , ()=>{
    console.log("Server is Running")
    console.log("server Running on : http://localhost:" + PORT);
})

