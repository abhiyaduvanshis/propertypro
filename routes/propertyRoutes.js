const express =require('express');
const router= express.Router();
const {getallproperty,addnewproperty,updateproperty,deleteproperty} = require("../controllers/propertyControllers");

router.route("/").get(getallproperty);
router.route("/addnewproperty").post(addnewproperty);
router.route("/updateproperty/:id").put(updateproperty);
router.route("/deleteproperty/:id").delete(deleteproperty);

module.exports=router;