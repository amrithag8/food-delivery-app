const mongoose = require("mongoose");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.registerNewUser = async (req, res) => {
  
  try {
    const SALT = 10;
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT);
    await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "Added" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Signup failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return res.status(400).json({ message: "Invalid email/password" });
    }
    
    const verifyPass = await bcrypt.compare(password, emailExists.password);
    if (!verifyPass) {
      return res.status(400).json({ message: "Invalid email/password" });
    }

    const accessToken = jwt.sign(
      { id: emailExists._id },
      process.env.THE_SECRET_KEY
    );
    return res
      .status(200)
      .json({ id: emailExists._id, name: emailExists.fullname, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Invalid response" });
  }
};
