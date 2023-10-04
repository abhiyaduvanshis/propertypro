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
    email:{
        type:String,
        required:[true,"Please enter email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
},
{
    timestamp:true
}
)
module.exports=mongoose.model("Users",userSchema);