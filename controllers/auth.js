// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/auth");
const { validateEmail } = require("../validators/email");
const { sendSignupEmail } = require("../helpers/sendMail");

const handleUserSignup = async (request, response) => {
  try {
    const { email, password, firstName, lastName, role } = request.body;
    if (!email) {
      return response.status(409).json({
        success: false,
        message: `missing required field: email`,
      });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email format" });
    }

    if (!password || password.length < 6) {
      return response.status(409).json({
        success: false,
        message: `missing required field or invalid format: password`,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({
        success: false,
        message: `User with email: ${email} already exists. Sign in`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    };

    const newUser = new User(data);
    await newUser.save();
    await sendSignupEmail(email, firstName );
    return response.status(201).json({
      success: true,
      message: `User registered successfully`,
      newUser,
    });
  } catch (e) {
    return response.status(500).json({
      success: false,
      message: `Error: ${e.message}`,
    });
  }
}

const handleGetUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const handleGetAllUsers = async (request, response) => {
  try {
    const users = await User.find()
  
    return response.status(200).json({
      success: true,
      message: 'success',
      users
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
}



const handleLogin = async (request, response) => {
  try {
    
    const {email, password} = request.body
    const existingUser = await User.findOne({email})
    if(!existingUser){
      return response.status(404).json({
        success: false,
        message: `User with this email address does not exist`
      })
    }
  
    const isMatch = await bcrypt.compare(password, existingUser?.password)
    if (!isMatch){
      return response.status(400).json({
        success: false,
        message: `Invalid email or password`
      })
    }
  
    //You can check if user is verified
  
    // generate token
    const accessToken = jwt.sign(
      {id: existingUser?._id, firstName: existingUser.firstName},
      process.env.ACCESS_TOKEN,
      {expiresIn: '1d'}
    )
  
    const refreshToken = jwt.sign(
      {id: existingUser?._id, firstName: existingUser.firstName},
      process.env.REFRESH_TOKEN,
      {expiresIn: '10d'}
    )
  
    response.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      existingUser
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
} 

module.exports = {
  handleGetAllUsers,
  handleGetUser,
  handleUserSignup,
  handleLogin,
}