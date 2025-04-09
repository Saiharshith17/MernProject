const express=require("express");
const  router=express.Router();
const {home,register,login}=require("../controllers/auth-controller");
const validate=require("../middlewares/validate-middleware");
const signupSchema=require("../validators/auth-validator");

// router.get("/",(req,res)=>{
//     res
//        .status(200)
//        .send("good");
// });



router.route("/").get(home);

router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(login);
module.exports=router;