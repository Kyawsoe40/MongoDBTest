const express= require("express")
const path= require("path")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const session=require("express-session")
const mongoStore=require("connect-mongodb-session")(session)
const csurf=require("tiny-csrf")
const cookieParser=require("cookie-parser")
const flash=require("connect-flash")


const app=express();
const {mongodbConnector}= require("./utils/database")

app.set("view engine","ejs");
app.set("views","views")

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"/public")))
app.use(flash())
app.use(cookieParser("cookie-parser-secret"))
const store=new mongoStore({
    uri: process.env.MONGODB_URI,
    collection: "mySessions"
})
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false,
    store
}))
app.use(csurf("123456789iamasecret987654321look"))

const User=require("./models/User")


app.use((req,res,next)=>{
    const userId=req.session.userId
    if(userId=== "undefined"){
        return next()
    }
    User.findById(userId).select("_id email")
    .then((user)=>{
        console.log(user)
        req.user=user
        next()
    }).catch(err=> console.log(err))  
})


const postRoutes=require("./routes/post")
const {adminRoutes}=require("./routes/admin")
const authRoutes=require("./routes/auth")
const { isLogin } = require("./middlewares/isLogin")
app.use(postRoutes)
app.use("/admin",isLogin,adminRoutes)
app.use(authRoutes)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(8000)
    console.log("Connted to Mongo Db!")
}).catch(err=> console.log(err))

