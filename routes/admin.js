const express=require("express");
const router=express.Router();

const Post= require("../models/Post"); 
const { renderCreatePage, createPost, renderEditPage, editPost, deletePost } = require("../controllers/posts");

router.get('/create-post',renderCreatePage)
router.post("/",createPost)

router.get('/edit-post/:postId',renderEditPage)
router.post("/edit-post",editPost)

router.post("/delete-post/:postId",deletePost)

module.exports={adminRoutes:router}