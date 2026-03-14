const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res) {
    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    // You cannot follow yourself.
    if(followeeUserName === followerUserName){
        return res.status(400).json({
            messeage:"You Cannot follow yourself"
        })
    }

    // Check if the target user exists.
    const followeeUser = await userModel.findOne({
        username: followeeUserName
    })

    if(!followeeUser){
        return res.status(404).json({
            messeage:"User you are trying to follow does not exist"
        })
    }

    // Check if there is already a follow relation/request between these two users.
    const existingFollowRecord = await followModel.findOne({
        follower:followerUserName,
        followee:followeeUserName
    })
    
    if(existingFollowRecord){
        // If previously rejected, allow sending request again.
        if(existingFollowRecord.status === "rejected"){
            existingFollowRecord.status = followeeUser.isPrivate ? "pending" : "accepted"
            await existingFollowRecord.save()
            return res.status(200).json({
                messeage: existingFollowRecord.status === "pending"
                    ? `Follow request sent to ${followeeUserName} again`
                    : `You are now following ${followeeUserName}`,
                follow: existingFollowRecord
            })
        }

        return res.status(200).json({
            messeage: existingFollowRecord.status === "pending"
                ? `Follow request already sent to ${followeeUserName}`
                : `You are already following ${followeeUserName}`,
            follow:existingFollowRecord
        })
    }

    // Private account -> pending request, Public account -> accepted directly.
    const followStatus = followeeUser.isPrivate ? "pending" : "accepted"

    const followRecord = await followModel.create({
        follower:followerUserName,
        followee: followeeUserName,
        status: followStatus
    })

    return res.status(201).json({
        messeage: followStatus === "pending"
            ? `Follow request sent to ${followeeUserName}`
            : `You are now following ${followeeUserName}`,
        follow:followRecord
    })
}

async function acceptFollowRequestController(req,res){
    const currentUserName = req.user.username
    const requesterUserName = req.params.username

    // Find pending request where current user is the followee (owner of private account).
    const followRequest = await followModel.findOne({
        follower: requesterUserName,
        followee: currentUserName,
        status: "pending"
    })

    if(!followRequest){
        return res.status(404).json({
            messeage:`No pending request from ${requesterUserName}`
        })
    }

    followRequest.status = "accepted"
    await followRequest.save()

    return res.status(200).json({
        messeage:`Accepted follow request from ${requesterUserName}`,
        follow: followRequest
    })
}

async function rejectFollowRequestController(req,res){
    const currentUserName = req.user.username
    const requesterUserName = req.params.username

    // Find pending request where current user is the followee.
    const followRequest = await followModel.findOne({
        follower: requesterUserName,
        followee: currentUserName,
        status: "pending"
    })

    if(!followRequest){
        return res.status(404).json({
            messeage:`No pending request from ${requesterUserName}`
        })
    }

    followRequest.status = "rejected"
    await followRequest.save()

    return res.status(200).json({
        messeage:`Rejected follow request from ${requesterUserName}`,
        follow: followRequest
    })
}

async function cancelFollowRequestController(req,res){
    const currentUserName = req.user.username
    const followeeUserName = req.params.username

    // Only pending request can be canceled by the follower who sent it.
    const followRequest = await followModel.findOne({
        follower: currentUserName,
        followee: followeeUserName,
        status: "pending"
    })

    if(!followRequest){
        return res.status(404).json({
            messeage:`No pending request found for ${followeeUserName}`
        })
    }

    await followModel.findByIdAndDelete(followRequest._id)

    return res.status(200).json({
        messeage:`Follow request canceled for ${followeeUserName}`
    })
}

async function getPendingRequestsController(req,res){
    const currentUserName = req.user.username

    // Show all pending requests where current user is the followee.
    const pendingRequests = await followModel.find({
        followee: currentUserName,
        status: "pending"
    }).sort({createdAt:-1})

    return res.status(200).json({
        messeage:"Pending follow requests fetched successfully",
        total: pendingRequests.length,
        requests: pendingRequests
    })
}

async function unfollowUserController(req,res) {
    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    // Unfollow should only work for accepted follow relation.
    const isUserFollowing = await followModel.findOne({
        follower:followerUserName,
        followee:followeeUserName,
        status:"accepted"
    })

    if(!isUserFollowing){
        return res.status(200).json({
            messeage:`You are not following ${followeeUserName} or request is still pending`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    return res.status(200).json({
        messeage:`You have unfollowed ${followeeUserName}`
    })
}

module.exports={
    followUserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    cancelFollowRequestController,
    getPendingRequestsController,
    unfollowUserController
}
