const express= require("express")
const path= require("path")
const bodyParser=require("body-parser")
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
app.use('/admin',(req,res,next)=>{
    console.log("I am Admin middleware")
    next()
})
const postRoutes=require("./routes/post")
const {adminRoutes}=require("./routes/admin")
app.use(postRoutes)
app.use("/admin",adminRoutes)
mongodbConnector()

app.listen(8000)