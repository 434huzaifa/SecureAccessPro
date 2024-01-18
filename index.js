const express=require('express')
const path=require('path')

const app = express() // express function
const publicPath=path.join(__dirname,'public')
app.use(express.static(publicPath));
app.set('view engine','ejs')

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