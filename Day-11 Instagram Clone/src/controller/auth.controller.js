const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


async function registerController (req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  // check if user exist with same email or username ?

  // const isUserExistsByEmail = await userModel.findOne({email})

  // if(isUserExistsByEmail){
  //     return res.status(409).json({
  //         message:"user already exists with same email"
  //     })
  // }

  // const isUserExistsByUsername = await userModel.findOne({username})

  // if(isUserExistsByUsername){
  //     return res.status(409).json({
  //         message:"user already exists with same username"
  //     })
  // }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "user already exists" +
        (isUserAlreadyExists.email === email
          ? " Email already exists"
          : " Username already exists"),
    });
  }

  // for passoword part we use a libary name crypto and it's already installed
  const hash = crypto.createHash("sha256").update(password).digest("hex");

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
   * And a second thing we are use JWT SECRET KEY
   * IMPORTANT :- must we pass expire date in jwt secret key if we don't pass this then our user
   * if not we expire our token then user validate lifetime
   */
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  /**
   * now we provide token to user and store this token in cookie
   */
  res.cookie("token", token);

  res.status(201).json({
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

async function loginController (req, res) {
  const { username, email, password } = req.body;

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

  if (!user) {
    res.status(404).json({
      message: "User not exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const ispassword = hash == user.password;

  if (!ispassword) {
    res.status(401).json({
      message: "Password Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

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

module.exports={
    registerController,
    loginController
}