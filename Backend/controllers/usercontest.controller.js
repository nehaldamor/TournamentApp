import Contest from "../models/contest.model.js";
import User from "../models/user.model.js";
// ✅ Get All Upcoming Contests
export const getAvailableContests = async (req, res) => {
  try {
    // Fetch all contests
    const contests = await Contest.find()
      .select("title entryFee firstPrize type secondPrize thirdPrize date maxPlayers status")
      .lean(); // optional, converts to plain JS objects

    // Separate contests by status
    const upcomingOrLive = contests.filter(c => c.status === "Upcoming" || c.status === "Live")
                                   .sort((a, b) => new Date(a.date) - new Date(b.date));
    const completed = contests.filter(c => c.status === "Completed")
                              .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Merge arrays: upcoming/live first, completed last
    const sortedContests = [...upcomingOrLive, ...completed];

    res.status(200).json({ contests: sortedContests });
  } catch (error) {
    console.error("Get Available Contests Error:", error);
    res.status(500).json({ message: "Server error while fetching contests" });
  }
};


// ✅ Join Contest
export const joinContest = async (req, res) => {
  try {
    const { id } = req.params; // Contest ID
    const userId = req.user._id; // Logged-in user

    const contest = await Contest.findById(id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    if (contest.status !== "Upcoming")
      return res.status(400).json({ message: "Contest already started or completed" });

    if (contest.participants.includes(userId))
      return res.status(400).json({ message: "Already joined this contest" });

    if (contest.participants.length >= contest.maxPlayers)
      return res.status(400).json({ message: "Contest is full" });

    // ✅ Fetch user wallet
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Wallet balance check
    if (user.wallet < contest.entryFee) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // ✅ Deduct entry fee from wallet
    user.wallet -= contest.entryFee;
    await user.save();

    // ✅ Add user to contest participants
    contest.participants.push(userId);
    await contest.save();

    // ✅ (Optional) Save transaction in history
    // await Transaction.create({
    //   userId,
    //   contestId: id,
    //   amount: contest.entryFee,
    //   type: "DEBIT",
    //   message: `Joined contest ${contest.title}`
    // });

    res.status(200).json({
      message: "Joined contest successfully",
      wallet: user.wallet,
      whatsappLink: contest.whatsappLink,
      accessCode: contest.accessCode,
    });
  } catch (error) {
    console.error("Join Contest Error:", error);
    res.status(500).json({ message: "Server error while joining contest" });
  }
};


// ✅ Rejoin Contest using Access Code
export const rejoinContest = async (req, res) => {
  try {
    const { accessCode } = req.body;
    const contest = await Contest.findOne({ accessCode });

    if (!contest)
      return res.status(404).json({ message: "Invalid access code" });

    res.status(200).json({
      message: "Access code valid",
      contest: {
        title: contest.title,
        date: contest.date,
        whatsappLink: contest.whatsappLink,
        status: contest.status,
      },
    });
  } catch (error) {
    console.error("Rejoin Contest Error:", error);
    res.status(500).json({ message: "Server error while rejoining contest" });
  }
};

export const getMyContests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find contests where the user is a participant
    const contests = await Contest.find({ participants: userId })
      .sort({ date: -1 }) // latest first
      .populate("participants", "freefireName") // optional: show player names

    if (!contests || contests.length === 0) {
      return res.status(404).json({ message: "No contests joined yet." });
    }
 
    res.status(200).json({
      success: true,
      count: contests.length,
      contests,
    });
  } catch (error) {
    console.error("Error fetching my contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Single Contest by ID
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
