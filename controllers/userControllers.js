const asyncHandler  = require("express-async-handler");
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const User          = require("../models/userModel");

const userlogin=asyncHandler(async (req,res) =>{
    //console.log(req.body);
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
    //console.log(user);
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    role:user.role,
                    id:user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({"token":`${ accessToken }`,"msg":"Login successfully","statuscode":0});
    }else{
        res.status(200).json({"statuscode":0,"msg":"Email or Password is incorrect"});
    }
});

const createuser=asyncHandler(async (req,res) =>{
    const{username,fullname,role,email,password}=req.body;
    if(!username){
        res.status(400);
        throw new Error("Username is required");
    }
    if(!fullname){
        res.status(400);
        throw new Error("Fullname is required");
    }
    if(!role){
        res.status(400);
        throw new Error("User Role is required");
    }
    if(!email){
        res.status(400);
        throw new Error("Email is required");
    }
    if(!password){
        res.status(400);
        throw new Error("Password is required");
    }
    const usernamecheck= await User.findOne({ username });
    if(usernamecheck){
        res.status(400);
        throw new Error("Username already exist");
    }
    const usercheck= await User.findOne({ email });
    if(usercheck){
        res.status(400);
        throw new Error("Email already exist");
    }
    //Hash password
    //console.log(req.user);
    const hashpassword= await bcrypt.hash(password,10);
    const user = await User.create(
        {
            username,
            fullname,
            role,
            email,
            password:hashpassword,
            created_by:req.user.id
        }
    );
    if(user){
        res.status(200).json({"statuscode":0,"msg":"User register successfully"});
    }else{
        res.status(200).json({"statuscode":1,"msg":"User not register successfully"});
    }
});

const getcurrentuser = asyncHandler(async(req,res) =>{
    res.json(req.user);
});

const userlist = asyncHandler(async (req,res) =>{
  
    let userlistdata ='';
    if(req.user.role===1){
        userlistdata = await User.find();
    }
    if(req.user.role!==1){
        userlistdata = await User.find({ created_by: req.user.id });
    }
    res.status(200).json(userlistdata);
});

const userlistbyid = asyncHandler(async (req,res) =>{
    const {userid}= req.body;
    console.log(req.body);
    console.log(req.user.id);
    const userlistdata = await User.findById(userid);
    res.status(200).json(userlistdata);
});

const updateuser= asyncHandler(async(req,res)=>{
    const userdata = await User.findById(req.params.id);
    const{username,fullname,role,email,password}=req.body;
    if(!userdata){
        res.status(200).json({"statuscode":1,"msg":"Data Not Found !"});
    }
    if((userdata.created_by.toString() !== req.user.id) || (userdata.id.toString() !== req.user.id)){
        res.status(200).json({"statuscode":1,"msg":"User Not to Authorised to update!"});
    }
    const hashpassword= await bcrypt.hash(req.body.password,10);
    const userudatedata=await User.findByIdAndUpdate(
        req.params.id,
        {    
            username,
            fullname,
            role,
            email,
            password:hashpassword,
            created_by:req.user.id
        },
        {new:true}
    );
    if(userudatedata){
        res.status(200).json({"statuscode":1,"data":userudatedata});
    }else{
        res.status(200).json({"statuscode":1,"msg":"User Not to Authorised to update! www"});
    }
});


module.exports={
    userlogin,
    createuser,
    userlist,
    getcurrentuser,
    updateuser,
    userlistbyid
}