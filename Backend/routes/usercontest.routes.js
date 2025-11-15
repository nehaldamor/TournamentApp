import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAvailableContests,
  joinContest,
  rejoinContest,
  getMyContests,
  getContestById,
} from "../controllers/usercontest.controller.js";

const router = express.Router();

router.get("/contests",getAvailableContests);
router.post("/join/:id", authMiddleware, joinContest);
router.post("/rejoin", authMiddleware, rejoinContest);
router.get("/my-contests", authMiddleware, getMyContests);
router.get("/contest/:id", getContestById);
export default router;
