// // This service generates a 6-digit OTP and calculates expiry
// export const generateOtp = () => {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
//   return { otp, expiry };
// };

// // Optional: integrate SMS API here
// import crypto from "crypto";
// import { sendEmail } from "../utils/emailService.js";

// export async function sendOtpSms(email,otp) {
//   await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. Valid for 5 minutes.`);
//   // return otp; // return OTP if needed (e.g., store in DB later)
// }

// // module.exports = { sendOtpSms,generateOtp };
// 

import { sendEmail } from "../utils/emailService.js";

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // valid 5 min
  return { otp, expiry };
};

export async function sendOtpSms(email, otp) {
  await sendEmail(
    email,
    "Your OTP Code",
    `Your OTP is <b>${otp}</b>. It is valid for 5 minutes.`
  );
}

