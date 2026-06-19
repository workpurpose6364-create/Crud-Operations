const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


let otpStore = {};
let resetOtpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existed = await User.findOne({ email });

    if (existed) {
      return res.status(400).send("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    otpStore[email] = {
      otp,
      username,
      password: hashedPassword,
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    res.send("OTP Sent");
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (
      !otpStore[email] ||
      otpStore[email].otp != otp
    ) {
      return res.status(400).send("Invalid OTP");
    }

    await User.create({
      username: otpStore[email].username,
      email,
      password: otpStore[email].password,
    });

    delete otpStore[email];

    res.send("Account Created");
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).send("User Not Found");
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).send("Wrong Password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      username: user.username,
      userId: user._id,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).send("User Not Found");
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    resetOtpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP is ${otp}`,
    });

    res.send("Reset OTP Sent");
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      newPassword,
    } = req.body;

    if (
      !resetOtpStore[email] ||
      resetOtpStore[email] != otp
    ) {
      return res.status(400).send("Invalid OTP");
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    delete resetOtpStore[email];

    res.send("Password Updated");
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
};