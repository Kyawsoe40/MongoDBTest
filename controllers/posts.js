const { request } = require("express");
const Post=require("../models/Post");

//Render Home Page
exports.renderHomePage= (req,res)=>{
    console.log(req.csrfToken())
    Post.find()
    .populate("userId","-password")
    .sort({title:1})
    .then((posts)=> {
        console.log(posts)
        res.render("home",{
            title:"HOME PAGE",
            posts,
            isLogin: req.session.isLogin? true : false,
            csrfToken: req.csrfToken()
        })
    })
    .catch(err=>console.log(err))
}
//Render Post Details Page
exports.renderDetailPage=(req,res)=>{
    const postId=req.params.postId
    const userId=JSON.stringify(req.session.userId)
    Post.findById(postId)
     .then((post)=> {
        res.render("postDetails",{
            title:"Post Details",
            post,
            isLogin: req.session.isLogin? true : false,
            userId,
            csrfToken: req.csrfToken()
        })
     }).catch(err=>console.log(err))
    
}
//Render Create Post Page
exports.renderCreatePage=(req,res)=>{
    res.render("createPost",{title:"Post-Create Page",csrfToken: req.csrfToken()})
}

exports.createPost=(req,res)=>{
    const {title,description,imgUrl}=req.body
    
    const userId=req.session.userId
    Post.create({title,description,imgUrl,userId})
    .then((result)=>console.log(result))
    .catch(err=> console.log(err))
    
    res.redirect("/")
}
//Render Edit Page
exports.renderEditPage=(req,res)=>{
    const postId=req.params.postId
    const userId=JSON.stringify(req.session.userId)
    Post.findById(postId)
     .then((post)=> {
        if(JSON.stringify(post.userId)===userId){
            res.render("editPost",{title:"Edit-post Page",post,csrfToken: req.csrfToken()})
        }else{
            res.redirect("/")
        }
        
     }).catch(err=>console.log(err))
    
}
exports.editPost=(req,res)=>{
    const {title,description,imgUrl,id}=req.body
    Post.updateOne({_id:id},{title,description,imgUrl})
    .then((result)=>console.log(result))
    .catch(err=> console.log(err))
    res.redirect("/")
}

//Delete Post
exports.deletePost=(req,res)=>{
    const postId=req.params.postId;
    Post.deleteOne({_id:postId})
    .then(()=>{
        res.redirect("/")
    }).catch(err=> console.log(err))
}