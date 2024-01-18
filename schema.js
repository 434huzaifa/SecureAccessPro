const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    password: {
        type: String,
        lowercase: true,
    },
    status:{
        type:String,
        default:"Pending"
    }
});
const User = mongoose.model("User", userSchema);
module.exports =  {User:User};