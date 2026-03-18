const express = require("express")
const userController = require("../controller/users.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

/**
 * @routes POST /api/users/follow/:username (:userid)
 * @description Follow a user (public account -> accepted, private account -> pending request)
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * @routes PATCH /api/users/follow/:username/accept
 * @description Accept a pending follow request from :username
 * @access Private
 */
userRouter.patch("/follow/:username/accept",identifyUser,userController.acceptFollowRequestController)

/**
 * @routes PATCH /api/users/follow/:username/reject
 * @description Reject a pending follow request from :username
 * @access Private
 */
userRouter.patch("/follow/:username/reject",identifyUser,userController.rejectFollowRequestController)

/**
 * @routes DELETE /api/users/follow/:username/cancel
 * @description Cancel a pending follow request sent to :username
 * @access Private
 */
userRouter.delete("/follow/:username/cancel",identifyUser,userController.cancelFollowRequestController)

/**
 * @routes GET /api/users/follow/requests
 * @description Get all pending follow requests for current user
 * @access Private
 */
userRouter.get("/follow/requests",identifyUser,userController.getPendingRequestsController)

/**
 * @routes DELETE /api/users/unfollow/:username (:userid)
 * @description Unfollow a user
 * @access Private
 */
userRouter.delete("/unfollow/:username",identifyUser,userController.unfollowUserController)

module.exports=userRouter
