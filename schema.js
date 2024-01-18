const mongo =require("mongoose")

const userSchema=new mongo.Schema({
    name:String,
    password:{
        type:String,
        lowercase:true,
    },
    images:{
        data:Buffer,
        type:String,
    }
})
module.exports=User