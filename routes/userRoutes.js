const express =require('express');
const router= express.Router();
const {userlogin,createuser} = require("../controllers/userControllers");

router.route("/login").post(userlogin);
router.route("/register").post(createuser);
module.exports=router;