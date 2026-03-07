const postModel = require("../models/posts.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken") // require token because identify which user create the post

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res) {
    console.log(req.body, req.file)

    const token = req.cookies.token // fetch the token to findout the user
    if(!token){
        return res.status(401).json({
            Message:"Token not provided , Unauthorized access"
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            Message:"user not authorized"
        })
    }
    console.log(decoded)


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder:"Instagram-Clone"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        Message:"Post created succesfully",
        post
    })
}

async function getPostController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            Message:"Token not provided , Unauthorized access"   
        })
    }
    let decoded;
    try {
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
           Message:"user not authorized"
        })
    }

    const userId = decoded.id
    const posts = await postModel.find({
        user:userId
    })
    res.status(200).json({
        Message:"Posts fetch successfully",
        posts
    })
}
async function getPostDetailsController(req,res) {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            Message:"Token not provided , Unauthorized access"
        })
    }
    let decoded
    try {
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            Message:"Invaild token"
        })
    }
    const userId=decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            Message:"Forbidden content. "
        })
    }
    const isValidUser = post.user.toString()===userId
    if(!isValidUser){
        return res.status(403).json({
            Message:"Forbidden Content"
        })
    }
    return res.status(200).json({
        Message:"post fetch successfully",
        post
    })
}

module.exports={
    createPostController,
    getPostController,
    getPostDetailsController
}

