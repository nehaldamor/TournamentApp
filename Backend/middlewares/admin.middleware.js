import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const adminMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.adminToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access Denied: No Token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Access Forbidden" });

    next();
  } catch (error) {
    // console.error(error);
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
