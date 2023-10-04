const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
    prop_name:{
        type:String,
        required:[true,"Please enter property name"]
    },
    property_name_display:{
        type:String,
        required:[false]
    },
    prop_type:{
        type:String,
        required:[true,"Please enter property name"]
    },
    city:{
        type:String,
        required:[true,"Please enter city"]
    },
    loaction:{
        type:String,
        required:[true,"Please enter loaction"]
    },
    prop_category:{
        type:String,
        required:[true,"Please enter property name"]
    },
    prop_developer:{
        type:String,
        required:[true,"Please enter property name"]
    },
    unit_type:{
        type:String,
        required:[true,"Please enter property name"]
    },
    beadroom:{
        type:String,
        required:[false]
    },
    overview:{
        type:String,
        required:[false]
    },
    highlights:{
        type:String,
        required:[false]
    },
    amenities:{
        type:String,
        required:[false]
    },
    project_area:{
        type:String,
        required:[false]
    },
    possession_date:{
        type:String,
        required:[false]
    },
    launch_date:{
        type:String,
        required:[false]
    },
    meta_title:{
        type:String,
        required:[false]
    },
    meta_keyword:{
        type:String,
        required:[false]
    },
    meta_description:{
        type:String,
        required:[false]
    }

},
{
    timestamp:true
}
)
module.exports=mongoose.model("Property",propertySchema);