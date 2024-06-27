const express=require("express");
const path =require("path");
const router=express.Router();
const {posts}=require("./admin")

router.get("/",(req,res)=>{
    console.log("HOME",posts)
    res.render("home",{title:"HOME PAGE",posts})
    //res.sendFile(path.join(__dirname,"..","views","home.html"))
})

module.exports= router;
