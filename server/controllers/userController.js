const User = require("../model/User");
//4] import bcrypt package
const bcrypt = require("bcrypt");
//1] register user to the database

const jwt = require("jsonwebtoken");

const PRIVATE_SIGN_KEY = process.env.PRIVATE_SIGN_KEY;

const registerUser = async (req, res, next) => {
  try {
    //2] destructure the form data values from req.body
    const { name, email, password } = req.body;
    //5] checked user existed or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, please use another email address",
      });
    } else {
      //4] generate hashedpassword
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      //3] saving the form data values to the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        status: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  try {
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordCorrect) {
        // We will create a token
        const token = jwt.sign({ userID: existingUser._id }, PRIVATE_SIGN_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: "Login Successful",
          email: existingUser.email,
          token,
        });
      } else {
        res.status(401).json({
          message: "Password or email are incorrect",
        });
      }
    } else {
      res.status(404).json({
        message: "The user not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { registerUser, handleLogin };
