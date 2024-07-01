
exports.renderLoginPage=(req,res)=>{
    res.render("auth/login",{title:"Login Page"})
}

exports.Login=(req,res)=>{
    res.setHeader("Set-cookie","login=true")
    res.redirect("/")
}

exports.Logout=(req,res)=>{
    res.setHeader("Set-cookie","login=false")
    res.redirect("/")
}