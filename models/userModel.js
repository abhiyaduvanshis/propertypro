const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"Please enter fullname"]
    },
    username:{
        type:String,
        required:[true,"Please enter user name"]
    },
    role:{
        type:String,
        required:[true,"Please enter user role"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true]
    },
},
{
    timestamp:true
}
)
module.exports=mongoose.model("Users",userSchema);