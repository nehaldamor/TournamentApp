import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import admincontestRoutes from "./routes/admincontest.routes.js";
import usercontestRoutes from "./routes/usercontest.routes.js";
import paymentRoutes from "./routes/payment.routes.js";


import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admincontest", admincontestRoutes);
app.use("/api/usercontest", usercontestRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Free Fire Tournament API running ");
});


export default app;
