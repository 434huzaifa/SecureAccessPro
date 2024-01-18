const mongoose = require("mongoose");
const humanizeErrors = require('mongoose-error-humanizer')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    password: {
        type: String,
        lowercase: true,
        
    },
    status:{
        type:String,
        default:"Pending"
    }
});
userSchema.post("save",humanizeErrors)
userSchema.post("update",humanizeErrors)
const User = mongoose.model("User", userSchema);
module.exports =  {User:User};