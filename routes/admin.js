const express=require("express");
const path =require("path");
const { route } = require("./post");
const router=express.Router();
const posts=[];

router.get('/create-post',(req,res)=>{
    res.render("createPost",{title:"Post-Create Page"})
})

router.post("/",(req,res)=>{
    const {title,description}=req.body
    console.log(title,description)
    posts.push({title,description})
    res.redirect("/")

})

module.exports={adminRoutes:router,posts}