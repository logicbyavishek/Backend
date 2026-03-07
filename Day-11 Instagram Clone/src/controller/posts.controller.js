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
    
}

module.exports={
    createPostController
}

