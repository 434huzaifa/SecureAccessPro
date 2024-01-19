require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const express = require('express')
    const mongoose = require('mongoose');
const { User } = require('./schema')
var multer = require('multer');
var request = require('request');
var fs = require('fs');
var path = require('path');
// var upload = multer({ dest: 'uploads/' });
const app = express()
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath));
app.use(express.json());
app.set('view engine', 'ejs') // EJS er jonno alada library install kora lagbe na. eta dewa matroi EJS view name Folder khujbe.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@saaddb.bmj48ga.mongodb.net/SecureAccessPro?retryWrites=true&w=majority`
mongoose.connect(uri)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
 });
 
 const upload = multer({ storage: storage });


 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

async function run() {
    try {
        app.post("/usercreate", async (req, res) => {
            try {
                let data = req.body
                let user = new User({
                    userid: data['userid'],
                    password: data['pass'],
                })
                let result = await user.save()
                res.send(result)
            } catch (e) {
                console.log(`The Error is:${e.message}`);
                res.status(500).send(`${e.message}`)
            }
        })
        app.get("/users", async (req, res) => {
            let users = await User.find().limit(2).lean()
            res.send(users)
        })

        app.post("/user", async (req, res) => {
            let data = req.body
            let user = await User.where("userid").equals(data['userid'])
            if (user && user[0]?.password == data['pass']) {
                res.send({ valid: true })
            } else {
                res.send({ valid: false })
            }
        })
        app.post("/updateuser",upload.single('image'), async (req, res, next) => {
            let data = req.body
            var imgPath = `uploads\\${req.file.originalname}`;
            let response= await cloudinary.uploader.upload(imgPath,
            { public_id: req.file.originalname }, 
            function(error, result) {return result});
            fs.unlink(imgPath, (err) => {
                if (err) {
                  console.error('Error: ', err);
                } else {
                  console.log('File deleted successfully');
                }
               });
            let user=await User.where("userid").equals(data['userid'])
            if (user.length!=0) {
                user[0].image=response.url;
                user[0].name=data['name'];
                user[0].save()
                res.send({sucess:true})
            }else{
                res.status(404).send("User Not found")
            }

        })
        app.get("/singleuser",async(req,res)=>{
            console.log(req.query.id);
            let id=req.query.id
            let user=await User.where("userid").equals(id).lean()
            if (user.length!=0) {
                res.send(user[0])
            }else{
                res.status(404).send("User Not found")
            }
        })
        app.get("/changeuser",async(req,res)=>{
            let id=req.query.id
            let action=req.query.action
            let user=await User.where("userid").equals(id)
            if (user.length!=0) {
                if (action=="accept") {
                    user[0].status="Accept"
                    user[0].save()
                    res.send({msg:"User Updated"})
                }else{
                    await User.deleteOne({userid:user[0].userid})
                    res.send({msg:"User Deleted"})
                }
            }else{
                res.status(404).send("User Not found")
            }
            
        })
    } catch (error) {
        console.log(`The Error is:${e.message}`);
        return
    }
}
run().catch(console.dir);


app.get("", (_, res) => {
    res.render("home")
})
app.get("/adminlogin", (_, res) => {
    res.render("login", { isadmin: true })// render er first arg hosse file er name. 2nd passing data
})
app.get("/userlogin", (_, res) => {
    res.render("login", { isadmin: false })
})

app.get("/userupdate", (_, res) => {
    res.render("imageuser", { isadmin: false })
})

app.get("/createuser", async (_, res) => {
    let users = await User.find().sort("-_id").limit(2).lean()
    res.render("createuser", { users })
})

app.get('/userinfos',async(_,res)=>{
    let users=await User.find().sort("status").lean()
    res.render("userinfos",{users})
})



app.listen(5000)