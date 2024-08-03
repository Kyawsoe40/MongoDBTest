const bcrypt=require("bcrypt")
const User=require("../models/User")
const dotenv=require("dotenv").config()
const nodemailer=require("nodemailer")
const crypto=require("crypto")

const transporter=nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.MAIL_PASSWORD,
    }

})

exports.renderRegisterPage=(req,res)=>{
    res.render("auth/register",{title:"Register Page",csrfToken: req.csrfToken(),errorMsg:req.flash('error')})
}
exports.registerAccount=(req,res)=>{
    const {username,email,password}=req.body
    User.findOne({username}).then((user)=>{
        if(user){
            req.flash('error','This username has been already used!')
            return res.redirect("/register")
        }
        return User.findOne({email}).then((user)=>{
            if(user){
                req.flash('error','This email has been already registered!')
                return res.redirect("/register")
            }
        return bcrypt
        .hash(password,10)
        .then(hashedPassword=>{
            return User.create({
                username,
                email,
                password:hashedPassword
            })
        })
    })
    }).then(()=>{
        res.redirect("/login")
        transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "Register Successfully",
            html: "<h1>Register account successfully</h1><p>Created an account using this email address</p>"
            
        },(err=>console.log(err)))
    }).catch(err=>console.log(err))
}

exports.renderLoginPage=(req,res)=>{

    res.render("auth/login",{title:"Login Page",csrfToken: req.csrfToken(),errorMsg:req.flash('error')})
}
exports.Login=(req,res)=>{
    const {email,password}=req.body
    User.findOne({email})
    .then((user)=>{
        if(!user){
            req.flash('error','Check your information and Try again!')
            return res.redirect("/login")
        }
        bcrypt.compare(password,user.password)
            .then((isMatch)=>{
                if(isMatch){
                    req.session.isLogin=true
                    req.session.userId=user._id
                    return req.session.save(err=>{                        
                        res.redirect("/")
                        console.log(err)
                })
                }
                req.flash('error','Check your information and Try again!')
                res.redirect("/login")

        })}).catch(err=>{
            console.log(err)
    })
    
}

exports.Logout=(req,res)=>{
    req.session.destroy()
    res.redirect("/")
}

exports.RenderResetPasswordPage=(req,res)=>{
    res.render("auth/reset",{title:"Reset Page",csrfToken: req.csrfToken(),errorMsg:req.flash('error')})
}

exports.RenderFeedbackPage=(req,res)=>{
    res.render("auth/feedback",{title:"Success"})
}

exports.ResetLinkSend=(req,res)=>{
    const {email}=req.body
    crypto.randomBytes(30,(err,buffer)=>{
        if(err){
            console.log(err)
            return res.redirect("/reset-password")
        }
        const token=buffer.toString("hex")
        User.findOne({email}).then(user=>{
            if(!user){
                req.flash('error','There is no account registered with this eamil!')
                return res.redirect("/reset-password")
            }
            user.resetToken=token
            user.tokenExpiration=Date.now()+600000
            return user.save()
        }).then(result=>{
            res.redirect('/feedback')
            console.log(email)
            transporter.sendMail({
                from: process.env.SENDER_MAIL,
                to: email,
                subject: "Reset your password",
                html: `<h1>Reset Password</h1><p>Change your account password by clicking the link below</p><a href="http://localhost:8000/reset-password/${token}">click here to change password</a>`
                
            },(err=>console.log(err)))
            
        }).catch(err=>console.log(err))
    })
}

exports.RenderNewPasswordPage=(req,res)=>{
    const {token}=req.params
    User.findOne({resetToken : token,tokenExpiration : {$gt : Date.now()}}).then(user=>{
        res.render("auth/reset-password",{
            title:"Change New Password",
            csrfToken: req.csrfToken(),
            errorMsg:req.flash('error'),
            resetToken:token,
            user_id:user._id.toString()})
    }).catch(err=>{
        console.log(err)
    })

}

exports.ChangeNewPassword=(req,res)=>{
    const {resetToken,user_id,password,confirm_password}=req.body
    User.findOne({resetToken,tokenExpiration: {$gt: Date.now()},_id:user_id}).then(user=>{
        if(password!==confirm_password){
            req.flash('error','This password is not match!')
            return res.redirect(`/reset-password/${resetToken}`)
        }
        return bcrypt.hash(password,10)
        .then(hashedPassword=>{
            
            user.password=hashedPassword
            user.resetToken= undefined
            user.tokenExpiration= undefined
            return user.save()    
        }).then(result=>{
            res.render("auth/login",{   
                title:"Change New Password",
                csrfToken: req.csrfToken(),
                errorMsg:req.flash('error'),})
        })
        
    }).catch(err=>console.log(err))
}