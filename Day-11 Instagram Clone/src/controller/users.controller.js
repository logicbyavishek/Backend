const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res) {
    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    /*Check add for you can not follow yourself*/
    if(followeeUserName === followerUserName){
        return res.status(400).json({
            messeage:"You Cannot follow yourself"
        })
    }

    // check that followee is exixst or not 
    const isFolloweeExists = await userModel.findOne({
        username: followeeUserName
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            messeage:"User you are trying to follow does not exist"
        })
    }

    // check that user already followed or not
    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUserName,
        followee:followeeUserName
    })
    
    if(isAlreadyFollowing){
        return res.status(200).json({
            messeage:`You are already following ${followeeUserName}`,
            follow:isAlreadyFollowing
        })
    }

    console.log("Follower:", followerUserName)
    console.log("Followee:", followeeUserName)

    const followRecord = await followModel.create({
        follower:followerUserName,
        followee: followeeUserName
    })

    res.status(201).json({
        messeage:`You are now following ${followeeUserName}`,
        follow:followRecord
    })
}

async function unfollowUserController(req,res) {
    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUserName,
        followee:followeeUserName
    })

    if(!isUserFollowing){
        return res.status(200).json({
            messeage:`You are not following ${followeeUserName}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        messeage:`You have unfollowed ${followeeUserName}`
    })
}

module.exports={
    followUserController,
    unfollowUserController
}