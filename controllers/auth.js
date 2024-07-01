
exports.renderLoginPage=(req,res)=>{
    res.render("auth/login",{title:"Login Page"})
}

exports.Login=(req,res)=>{
    req.session.isLogin=true
    res.redirect("/")
}

exports.Logout=(req,res)=>{
    req.session.destroy()
    res.redirect("/")
}