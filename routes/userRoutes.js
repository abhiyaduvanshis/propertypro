const express =require('express');
const router= express.Router();
const {userlogin,createuser,userlist,getcurrentuser,updateuser,userlistbyid} = require("../controllers/userControllers");
const validateToken = require('../middleware/validateTokenHandler');

router.route("/login").post(userlogin);
router.route("/register").post(validateToken,createuser);
router.route("/current").get(validateToken,getcurrentuser);
router.route("/userlist").get(validateToken,userlist);
router.route("/userlistbyid").get(validateToken,userlistbyid);
router.route("/updateuser/:id").put(validateToken,updateuser);
module.exports=router;