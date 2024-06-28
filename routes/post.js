const express=require("express");
const path =require("path");
const router=express.Router();

const { renderHomePage, renderDetailPage } = require("../controllers/posts");



router.get("/",renderHomePage)

router.get("/post/:postId",renderDetailPage)

module.exports= router;
