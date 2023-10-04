const asyncHandler  = require("express-async-handler");
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const User          = require("../models/userModel");
const userlogin=asyncHandler(async (req,res) =>{
    const{email,password}=req.body;
    if(!email){
        res.status(400);
        throw new Error("Email is required");
    }
    if(!password){
        res.status(400);
        throw new Error("password is required");
    }
    const user=await User.findOne({email});
    //console.log(data);
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.status(200).json({_id:user.id,"token":`${ accessToken }`,"msg":"Login successfully"});
    }else{
        res.status(400);
        throw new Error("Email or password is not correct!");
    }
});

const createuser=asyncHandler(async (req,res) =>{
    const{username,fullname,email,password}=req.body;
    if(!username){
        res.status(400);
        throw new Error("Username is required");
    }
    if(!fullname){
        res.status(400);
        throw new Error("Fullname is required");
    }
    if(!email){
        res.status(400);
        throw new Error("Email is required");
    }
    if(!password){
        res.status(400);
        throw new Error("Password is required");
    }
    const usercheck= await User.findOne({ email });
    
    if(usercheck){
        res.status(400);
        throw new Error("Email already exist");
    }
    //Hash password
    const hashpassword= await bcrypt.hash(password,10);
    const user = await User.create(
        {
            username,
            fullname,
            email,
            password:hashpassword
        }
    );
    if(user){
        res.status(200).json({_id:user.id,email:user.email,"msg":"User register successfully"});
    }else{
        res.status(400);
        throw new Error("Something went wrong!");
    }
});


module.exports={
    userlogin,
    createuser
}