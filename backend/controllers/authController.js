const User = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, birthname, email, phonenumber, address, admin } =
    req.body;

  // Check if user and passworld exist
  if (!username || !password || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide full information !",
    });
  }

  // Check for user existing
  try {
    const user = await User.getUserByEmail(email);
    console.log(user);
    if (user === null) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = User.createUser(
      username,
      hashedPassword,
      birthname,
      email,
      phonenumber,
      address,
      admin
    );

    //Return token
    const accessToken = jwt.sign(
      {
        userId: newUser[0].id,
        isAdmin: newUser[0].admin,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      accessToken,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user and passworld exist
  if (!email || !password)
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password!",
    });

  // Check for existing User
  try {
    const user = await User.getUserByEmail(email);
    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "Incorrect username or password",
      });

    // User found
    const passwordValid = await argon2.verify(user[0].password, password);
    if (!passwordValid)
      return res.status(400).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    //All good
    //Return token
    const accessToken = jwt.sign(
      {
        userId: user[0].id,
        isAdmin: user[0].admin,
      },
      process.env.JWT_SECRET
    );
    res.json({
      status: "success",
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

module.exports = {
  login,
  register,
};
