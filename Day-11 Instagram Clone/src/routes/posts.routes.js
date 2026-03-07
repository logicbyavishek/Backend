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

postRouter.get("/",postController.getPostController)

/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId",postController.getPostDetailsController)


module.exports=postRouter