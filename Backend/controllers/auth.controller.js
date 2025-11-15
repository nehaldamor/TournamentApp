import { checkPrimeSync } from "crypto";
import User from "../models/user.model.js";
import { generateOtp, sendOtpSms } from "../services/otpServices.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { mobile,email, freefireName,userName } = req.body;
    if (!email || !mobile || !freefireName || !userName) return res.status(400).json({ message: "please fill all the fields" });
    if(mobile.length !== 10){
      return res.status(400).json({ message: "Mobile number must be 10 digits long" });
    }
    let user = await User.findOne({ email });

    const { otp, expiry } = generateOtp();

    if(user){
      return res.status(400).json({ message: "User with this email or mobile number already exists" });
    }
    if (!user) {
      user = new User({ mobile, email,freefireName,userName, otp, otpExpiry: expiry });
    } else {
      user.otp = otp;
      user.otpExpiry = expiry;
    }

    await user.save();
    await sendOtpSms(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2️⃣ Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Mobile & OTP required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie('token', token);
    res.status(200).json({ message: "OTP verified", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN: existing user
export const login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email is  required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found, please register" });

    const { otp, expiry } = generateOtp();
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendOtpSms(email, otp);
    res.status(200).json({ message: "OTP sent for login" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Set or update Free Fire Name (IGN)
export const setFreeFireName = async (req, res) => {
  try {
    const { freefireName } = req.body;

    if (!freefireName) return res.status(400).json({ message: "Free Fire Name is required" });

    // req.user comes from authMiddleware (JWT)
    const user = await User.findById(req.user._id);
    user.freefireName = freefireName;
    await user.save();

    res.status(200).json({ message: "Free Fire Name updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const setUserName = async (req, res) => {
  try {
    const { UserName } = req.body;
    if (!UserName) return res.status(400).json({ message: "User Name is required" });

    // req.user comes from authMiddleware (JWT)
    const user = await User.findById(req.user._id);
    user.userName = UserName;
    await user.save();

    res.status(200).json({ message: "user Name updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    // req.user populated by authMiddleware
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
