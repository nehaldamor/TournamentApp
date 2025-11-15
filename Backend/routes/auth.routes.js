import express from "express";
import  { body } from  "express-validator";
import { sendOtp,setUserName, verifyOtp ,setFreeFireName,getProfile,login} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.put("/set-ign",authMiddleware,  setFreeFireName);
router.put("/update-user",authMiddleware,  setUserName);
router.get("/profile", authMiddleware, getProfile);

export default router;
