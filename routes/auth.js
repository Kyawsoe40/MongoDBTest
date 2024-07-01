const express=require("express")
const router=express.Router()
const authController=require("../controllers/auth")

router.get("/login",authController.renderLoginPage)

router.post("/login",authController.Login)

router.get("/logout",authController.Logout)
module.exports=router