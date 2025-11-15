// import nodemailer from "nodemailer";

// export const sendEmail = async (email, subject, message) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,      // SSL port
//       secure: true,   // true for 465, false for 587
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false, // allows self-signed certs
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject,
//       text: message,
//     });

//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Email sending failed:", error);
//   }
// };


// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const sendEmail = async (to, subject, message) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false, // use STARTTLS for port 587
//       auth: {
//         user: process.env.SMTP_USER, // 9b14cc001@smtp-brevo.com
//         pass: process.env.SMTP_PASS, // your Brevo SMTP key
//       },
//     });

//     const mailOptions = {
//       from: "nehaldamor77@gmail.com", // visible sender name/email
//       to,
//       subject,
//       text: message,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.response);
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//   }
// };


import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (to, subject, message) => {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();

    // ✅ Correct way for new SDK
    apiInstance.authentications["apiKey"].apiKey = process.env.SMTP_PASS;

    const sendSmtpEmail = {
      sender: { name: "KheloFF", email: "nehaldamor77@gmail.com" }, // verified sender
      to: [{ email: to }],
      subject,
      htmlContent: `<p>${message}</p>`,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // console.log("✅ Email sent successfully:", response.messageId || response);
  } catch (error) {
    console.error("❌ Email sending failed:", error.response?.text || error);
  }
};
