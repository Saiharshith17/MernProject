require("dotenv").config();
const express= require("express");
const app=express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router")
const connectDb= require("./utils/db")
const errorMiddleware=require("./middlewares/error-middleware")
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use(errorMiddleware);
// app.get("/",(req,res)=>{
//     res.status(200).send("mg");
// });



// app.get("/register",(req,res)=>{
//     res.status(200).send("mg");
// });

const port=5000;

connectDb().then(()=>{
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});
});