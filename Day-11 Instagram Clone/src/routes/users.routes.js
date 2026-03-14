const express = require("express")
const userController = require("../controller/users.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

/**
 * @routes POST /api/users/follow/:username (:userid)
 * @description Follow a user 
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * @routes POST /api/users/unfollow/:username (:userid)
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

module.exports=userRouter