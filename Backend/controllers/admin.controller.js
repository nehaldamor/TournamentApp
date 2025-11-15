import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_SECRET = process.env.ADMIN_SECRET;
export const adminLogin = async (req, res) => {
  try {
    const { secretCode } = req.body;
    if (!secretCode) {
      return res.status(400).json({ message: "Admin code required" });
    }

    if (secretCode !== ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid admin code" });
    }

    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Admin login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
