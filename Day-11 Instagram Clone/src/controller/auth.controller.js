const userModel = require("../models/user.model"); // require user model from user.model.js
// const crypto = require("crypto"); // require crypto for encryption
const bcrypt = require("bcryptjs") //for more security than crypto we use bcrypt .js
const jwt = require("jsonwebtoken");//require jsonwebtoken for token creation


async function registerController (req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  /**
   * we use $or operator for check user exist with same email or username in isUserAlreadyExist variable
   */
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }], 
  });

  /**
   * if the user exist with same email or username then return error message 
   */
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "user already exists" +
        (isUserAlreadyExists.email === email // if user exist with email or username this is the condition to provide the user error messeage
          ? " Email already exists"
          : " Username already exists"),
    });
  }

  // for passoword part we use a libary name crypto and it's already installed
  // const hash = crypto.createHash("sha256").update(password).digest("hex"); // create hash for password security 
  // Now we use the bcrypt for password security
  
  const hash = await bcrypt.hash(password,10) // this is the bcrypt hash for password security and the 10 means the number of times the hash is generated

  /**
   * creaate user in data base 
   */

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  // now we create a token for token we use a package jsonwebtoken

  /**
   * in this portion we use user data
   * and this data must be unique (like email or userId)
   * And a second thing we are use JWT SECRET KEY || jwt secrect key generate and copy jwtsecret.com 
   * IMPORTANT :- must we pass expire date in jwt secret key if we don't pass this 
   * then our user if not we expire our token then user validate lifetime
   */

  const token = jwt.sign(
    {
      id: user._id,
      username:user.username // user data token create using user id and username both are unique
    },
    process.env.JWT_SECRET, // jwt secret key
    { expiresIn: "1d" }, // expire time 1day set
  );
  /**
   * now we provide token to user and store this token in cookie
   */
  res.cookie("token", token); // this token store in cookie storage and this storage is accesable by server . 
  // server read and write the data present in cookie storage 

  res.status(201).json({ // send a response when user create succesfully
    message: "user register successfully",
    user: {
      username: user.username,
      email: user.email,
      passowrd: user.password,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

/**
 * This is log in controller and mind it when we go for log in and register then in this all request 
 * we dont need to send token but we must provide token 
 */

async function loginController (req, res) {
  const { username, email, password } = req.body; // fetch the login credentials

  /**
   * Find the username or email provide for log in credential
   * amader dekhte hbe j adeo ei nam e ba ei email e kono user amader data base e ache jdi thake tahole aga jabo
   * nahole kono user ese emni ese mon valo nei bol icche moto log in korbe eta tho hote pare na 
   */
  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  //jdi user na thake tahole ekta error messeage debo 

  if (!user) {
    res.status(404).json({
      message: "User not exists",
    });
  }

  //user er dawa password r amader store has password taa k match kore dekhbo jsdi thik hoi tobei take log in korte  debo noi na 

  // const hash = crypto.createHash("sha256").update(password).digest("hex");

  // const ispassword = hash == user.password;

  /**
   * now we use bcrypt their also and this syntax is very friendly
   */

  const ispassword = await bcrypt.compare(password, user.password)

  //password jdi match na kore tahole amra bolbo j incorrect password messeage debo
  if (!ispassword) {
    res.status(401).json({
      message: "Password Incorrect",
    });
  }
  // jdi password thik dei tahole ebar token dawar pala amara token debo tar jonno token jmn reguster e create kora ache omn create kore nebo 
  const token = jwt.sign({ id: user._id , username:user.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //token ta cookie te save kore debo 
  res.cookie("token", token);
  //log in kora suvcces hole messeage debo r response debo kintu ete te passwor ddebo na mind it 
  res.status(201).json({
    message: "Logged In Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}



// ekhane amra amader log in controller jegulo ache export korbo se gulo 
module.exports={
    registerController,
    loginController
}