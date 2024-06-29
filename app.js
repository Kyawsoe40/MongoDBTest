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

app.use((req,res,next)=>{
    console.log("I am parent middleware")
    next()
})

const postRoutes=require("./routes/post")
const {adminRoutes}=require("./routes/admin")
app.use(postRoutes)
app.use("/admin",adminRoutes)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(8000)
    console.log("Connted to Mongo Db!")
}).catch(err=> console.log(err))

