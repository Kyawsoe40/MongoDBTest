const express= require("express")
const path= require("path")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()

const app=express();
const {mongodbConnector}= require("./utils/database")

app.set("view engine","ejs");
app.set("views","views")

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"/public")))
const User=require("./models/User")

app.use((req,res,next)=>{
    User.findById("668167fe3c4958dccf81e237")
    .then((user)=>{
        req.user=user
        next()
    }).catch(err=> console.log(err))
    
})
app.use("/admin",(req,res,next)=>{
    const cookie=req.get("Cookie").split("=")[1].trim('') === "true"
    if(cookie){
        next()
    }else{
        res.redirect("/login")
    }
})

const postRoutes=require("./routes/post")
const {adminRoutes}=require("./routes/admin")
const authRoutes=require("./routes/auth")
app.use(postRoutes)
app.use("/admin",adminRoutes)
app.use(authRoutes)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(8000)
    console.log("Connted to Mongo Db!")
    User.findOne().then((user)=>{
        if(!user){
            return User.create({username:"Admin",email:"admin@gmail.com",password:"admin123"})
        }
        return user
    }).then((result)=>console.log(result))
}).catch(err=> console.log(err))

