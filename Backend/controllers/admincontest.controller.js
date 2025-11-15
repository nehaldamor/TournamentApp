import Contest from "../models/contest.model.js";
import crypto from "crypto";

// Helper: Generate random unique access code
const generateAccessCode = () => {
  return "FF-" + crypto.randomBytes(3).toString("hex").toUpperCase();
};

//  Create Contest
export const createContest = async (req, res) => {
  try {
    const { title, type,date, entryFee, firstPrize,secondPrize,thirdPrize, maxPlayers ,whatsappLink} = req.body;

    if (!title || !date || !whatsappLink ) {
      return res.status(400).json({ message: "Title and Date are required" });
    }

    const accessCode = generateAccessCode();
    const contest = new Contest({
      title,
      date,
      entryFee,
      firstPrize,
      secondPrize,
      thirdPrize,
      maxPlayers,
      accessCode,
      whatsappLink,
      type
    });

    await contest.save();
    res.status(201).json({ message: "Contest created successfully", contest });
  } catch (error) {
    console.error("Create Contest Error:", error);
    res.status(500).json({ message: "Server error while creating contest" });
  }
};

// ✅ Update Contest (for WhatsApp link or prize change)
export const updateContest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const contest = await Contest.findByIdAndUpdate(id, updates, { new: true });
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    res.status(200).json({ message: "Contest updated successfully", contest });
  } catch (error) {
    console.error("Update Contest Error:", error);
    res.status(500).json({ message: "Server error while updating contest" });
  }
};

// ✅ Get All Contests
export const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().lean(); // convert to plain JS objects

    // Separate by status
    const upcomingOrLive = contests
      .filter(c => c.status === "Upcoming" || c.status === "Live")
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // earliest first

    const completed = contests
      .filter(c => c.status === "Completed")
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const sortedContests = [...upcomingOrLive, ...completed];

    res.status(200).json({ contests: sortedContests });
  } catch (error) {
    console.error("Get Contests Error:", error);
    res.status(500).json({ message: "Server error while fetching contests" });
  }
};


// ✅ Mark Contest as Completed
export const completeContest = async (req, res) => {
  try {
    const { id } = req.params;
    const contest = await Contest.findById(id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    contest.status = "Completed";
    contest.expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // auto delete after 2 days
    await contest.save();

    res.status(200).json({ message: "Contest marked as completed", contest });
  } catch (error) {
    console.error("Complete Contest Error:", error);
    res.status(500).json({ message: "Server error while completing contest" });
  }
};
// ✅ Get Contest Players

export const getContestPlayers = async (req, res) => {
  try {
    const { contestId } = req.params;

    const contest = await Contest.findById(contestId).populate(
      "participants",
      "userName freefireName mobile email "
    );

    if (!contest) return res.status(404).json({ message: "Contest not found" });

    res.json({
      contest: contest.title,
      players: contest.participants.map((user) => ({
        id: user._id,
        userName: user.userName,
        freefireName: user.freefireName,
        mobile: user.mobile,
        email: user.email,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getContestById = async (req, res) => {
  try {
    const { id } = req.params;

    const contest = await Contest.findById(id)
      .select("title entryFee firstPrize secondPrize thirdPrize maxPlayers status date rules whatsappLink");

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({ contest });
  } catch (error) {
    console.error("Get Contest By ID Error:", error);
    res.status(500).json({ message: "Server error while fetching contest details" });
  }
};