const jwt = require("jsonwebtoken") // require token because identify which user create the post

async function identifyUser(req,res,next) {
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
    
    req.user = decoded

    next()
}

module.exports=identifyUser