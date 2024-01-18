require('dotenv').config();
const express=require('express')
const path=require('path')
const mongoose = require('mongoose');
const {User}= require('./schema')

const app = express() 
const publicPath=path.join(__dirname,'public')
app.use(express.static(publicPath));
app.use(express.json());
app.set('view engine','ejs')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@saaddb.bmj48ga.mongodb.net/SecureAccessPro?retryWrites=true&w=majority`
mongoose.connect(uri)


async function run() {
    try {
        app.post("/usercreate",async(req,res)=>{
            console.log(req.body);
        
        })
    } catch (error) {
        console.log(`The Error is:${e.message}`);
        return
    }
}
run().catch(console.dir);


app.get("",(_,res)=>{
    res.render("home")
})
app.get("/adminlogin",(_,res)=>{
    res.render("login",{isadmin:true})
})
app.get("/userlogin",(_,res)=>{
    res.render("login",{isadmin:false})
})

app.get("/createuser",(_,res)=>{
    res.render("createuser")
})



app.listen(5000)