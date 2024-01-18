const mongoose = require("mongoose");
const humanizeErrors = require('mongoose-error-humanizer')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:null
    },
    userid:{
        type:String,
        unique:true,
    },
    password: {
        type: String,
        lowercase: true,
    },
    status:{
        type:String,
        default:"Pending"
    },
    image:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }
});
userSchema.post("save",humanizeErrors)
userSchema.post("update",humanizeErrors)
const User = mongoose.model("User", userSchema);
module.exports =  {User:User};