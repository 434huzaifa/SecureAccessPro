const express=require('express')
const path=require('path')

const app = express() // express function
const publicPath=path.join(__dirname,'public')
app.set('view engine','ejs')
app.use(express.static(publicPath));