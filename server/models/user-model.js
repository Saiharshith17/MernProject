const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});

userSchema.pre("save", async function(next){
   const user=this;
   console.log(this);

   if(!user.isModified("password")){
    next();
   }

   try{
    const saltRound= await bcrypt.genSalt(10);
    const hash_password= await bcrypt.hash(user.password,saltRound);
    user.password=hash_password;
   }catch(error){
    next(error);
   }
});

userSchema.methods.generateToken=async function() {
   try{
    return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.Admin,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d",
    }
);
   }catch(error){

   }
};

userSchema.methods.compare = async function (enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
      console.error("Password comparison error:", error);
      return false;
    }
  };

const User=new mongoose.model("User",userSchema);
module.exports=User;