const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/posts.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})


/**
 * POSTS
 * post api/posts [protected]
 * req.body{caption , image-file}
 **/

postRouter.post("/",upload.single("Image"),postController.createPostController)


module.exports=postRouter