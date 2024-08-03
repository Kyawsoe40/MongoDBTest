const express=require("express")
const router=express.Router()
const authController=require("../controllers/auth")

router.get("/register",authController.renderRegisterPage)
router.post("/register",authController.registerAccount)

router.get("/login",authController.renderLoginPage)
router.post("/login",authController.Login)

router.post("/logout",authController.Logout)

router.get("/reset-password",authController.RenderResetPasswordPage)
router.post("/reset-password",authController.ResetLinkSend)

router.get("/feedback",authController.RenderFeedbackPage)

router.get("/reset-password/:token",authController.RenderNewPasswordPage)

router.post("/change-new-password",authController.ChangeNewPassword)
module.exports=router