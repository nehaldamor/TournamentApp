import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JoinedContestPage = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const API = import.meta.env.VITE_API_BASE_URL;
  // 👉 Static Rules (Manual)
  const rules = [
    "Room ID और Password किसी के साथ शेयर न करें।",
    "कोई भी hacker / emulator use नहीं करना है।",
    "अगर match time miss किया तो refund नहीं मिलेगा।",
    "WhatsApp group में admin की बात follow करें।",
    "गलत behavior या abuse करने पर ban कर दिया जाएगा।"
  ];

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API}/usercontest/contest/${contestId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setContest(response.data.contest);
      } catch (error) {
        console.log("Error fetching contest details:", error);
      }
    };

    fetchContest();
  }, [contestId]);

  if (!contest)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-5 text-white bg-zinc-900/60 rounded-lg shadow-lg">
      {/* ✅ Title */}
      <h1 className="text-2xl font-bold text-center">{contest.title}</h1>
      <p className="text-center text-green-400 text-sm">
        ✅ You have successfully joined this contest!
      </p>

      {/* ✅ Contest Info Card */}
      <div className="mt-5 bg-zinc-800/60 p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-3">🎯 Contest Information</h2>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
          <p>🎟 <span className="text-zinc-400">Entry Fee:</span> ₹{contest.entryFee}</p>
          <p>🏆 <span className="text-zinc-400">1st Prize:</span> ₹{contest.firstPrize}</p>

          {/* ✅ Show 2nd Prize when > 0 */}
          {contest.secondPrize > 0 && (
            <p>🥈 <span className="text-zinc-400">2nd Prize:</span> ₹{contest.secondPrize}</p>
          )}

          {/* ✅ Show 3rd Prize when > 0 */}
          {contest.thirdPrize > 0 && (
            <p>🥉 <span className="text-zinc-400">3rd Prize:</span> ₹{contest.thirdPrize}</p>
          )}

          <p>📅 <span className="text-zinc-400">Date:</span> {new Date(contest.date).toLocaleDateString()}</p>
          <p>⏰ <span className="text-zinc-400">Time:</span> {new Date(contest.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      </div>

      {/* ✅ WhatsApp Group Section */}
      <div className="mt-5 p-4 border border-green-500 rounded-lg bg-green-900/20">
        <p className="font-semibold text-lg">📢 Official WhatsApp Group</p>
        <a
          href={contest.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline text-sm"
        >
          Join Group
        </a>
      </div>

      {/* ✅ Rules Section */}
      <div className="mt-5 p-4 border border-gray-600 rounded-lg bg-zinc-800">
        <h2 className="font-semibold text-lg mb-2">📜 Rules & Regulations</h2>
        <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      {/* ✅ Warning */}
      <p className="mt-4 text-red-500 text-xs text-center">
        ⚠ इस contest की जानकारी (Room ID, Password, WhatsApp Link) किसी के साथ share ना करें,
        वरना आपको future tournaments में block किया जा सकता है।
      </p>
    </div>
  );
};

export default JoinedContestPage;
