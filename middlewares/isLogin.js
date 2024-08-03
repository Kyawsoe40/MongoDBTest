exports.isLogin=(req,res,next)=>{
    const isLogin=req.session.isLogin? true : false
    if(!isLogin){
        return res.redirect("/")
    }
    next()

}