import express from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createContest,
  updateContest,
  getAllContests,
  completeContest,
  getContestPlayers,
  getContestById
} from "../controllers/admincontest.controller.js";

const router = express.Router();

router.post("/contest",  adminMiddleware, createContest);
router.put("/contest/:id",  adminMiddleware, updateContest);
router.get("/contests", adminMiddleware, getAllContests);
router.put("/contest/:id/complete", adminMiddleware, completeContest);
router.get("/:contestId/players", adminMiddleware, getContestPlayers);
router.get("/contest/:id", getContestById);
export default router;
