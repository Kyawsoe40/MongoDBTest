const Post=require("../models/Post");

//Render Home Page
exports.renderHomePage= (req,res)=>{
    Post.getPosts()
    .then((posts)=> {
        res.render("home",{title:"HOME PAGE",posts})
    })
    .catch(err=>console.log(err))
}
//Render Post Details Page
exports.renderDetailPage=(req,res)=>{
    const postId=req.params.postId
    Post.getSinglePost(postId)
     .then((post)=> {

        res.render("postDetails",{title:"Post Details",post})
     }).catch(err=>console.log(err))
    
}
//Render Create Post Page
exports.renderCreatePage=(req,res)=>{
    res.render("createPost",{title:"Post-Create Page"})
}

exports.createPost=(req,res)=>{
    const {title,description,imgUrl}=req.body
    const post=new Post(title,description,imgUrl)
    post.create()
    .then((result)=>console.log(result))
    .catch(err=> console.log(err))
    res.redirect("/")
}
//Render Edit Page
exports.renderEditPage=(req,res)=>{
    const postId=req.params.postId
    Post.getSinglePost(postId)
     .then((post)=> {
        res.render("editPost",{title:"Edit-post Page",post})
     }).catch(err=>console.log(err))
    
}
exports.editPost=(req,res)=>{
    const {title,description,imgUrl,id}=req.body
    const post=new Post(title,description,imgUrl,id)
    post.create()
    .then((result)=>console.log(result))
    .catch(err=> console.log(err))
    res.redirect("/")
}

//Delete Post
exports.deletePost=(req,res)=>{
    const postId=req.params.postId;
    Post.deletePost(postId).then(()=>{
        res.redirect("/")
    }).catch(err=> console.log(err))
}