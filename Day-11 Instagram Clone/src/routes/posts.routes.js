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

// Multer use for a middleware and it's used to accept the file from uder side express can't read file so that'as why we use middleware

postRouter.post("/",upload.single("Image"),postController.createPostController)

/**
 * GET /api/posts/ [protected]
 */

postRouter.get("/",postController)


module.exports=postRouter