const asyncHandler= require("express-async-handler");
const Property = require("../models/propertyModel")

const getallproperty = asyncHandler(async(req,res)=>{
    const getallproperty = await Property.find();
    if(getallproperty){
        res.status(200).json(getallproperty);
    }else{
        res.status(400);
        throw new Error("Data Not Found");
    }
});

const addnewproperty=asyncHandler(async (req,res) =>{
    //console.log("hello body",req.body);
    const {prop_name,property_name_display,prop_type,city,loaction,prop_category,prop_developer,unit_type,highlights,overview,amenities,project_area,possession_date,launch_date,meta_title,meta_keyword,meta_description}=req.body;
    if(!prop_name){
        res.status(400);
        throw new Error("Property Name is required");
    }
    if(!prop_type){
        res.status(400);
        throw new Error("Property Type is required");
    }
    if(!city){
        res.status(400);
        throw new Error("Property City is required");
    }
    if(!loaction){
        res.status(400);
        throw new Error("Property location is required");
    }
    if(!prop_category){
        res.status(400);
        throw new Error("Property category is required");
    }
    if(!prop_developer){
        res.status(400);
        throw new Error("Property Developer is required");
    }
    const propertycheck = await Property.findOne({prop_name});
    if(propertycheck){
        res.status(400);
        throw new Error("Property Name is already exist");
    }

    const property = await Property.create(
        {
            prop_name,
            property_name_display,
            prop_type,
            city,
            loaction,
            prop_category,
            prop_developer,
            unit_type,
            highlights,
            overview,
            amenities,
            project_area,
            possession_date,
            launch_date,
            meta_title,
            meta_keyword,
            meta_description
        }
    );

    if(property){
        res.status(200).json({_id:property.id,propertyname:property.prop_name,"msg":"Property Add successfully"});
    }else{
        res.status(400);
        throw new Error("Property category is required");
    }

});

const updateproperty=asyncHandler(async(req,res)=>{
    res.send(`Update New Property ${req.params.id}`); 
});
const deleteproperty = asyncHandler(async(req,res) =>{
    res.send(`Delete New Property ${req.params.id}`); 
});
module.exports={
    getallproperty,
    addnewproperty,
    updateproperty,
    deleteproperty
}