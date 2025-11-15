import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  userName:{
    type: String,
    required: true
  },
  freefireName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    required:true
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  joinedContests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest"
  }],
  wallet: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
