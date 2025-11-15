import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ पहले import useAuth करो
import axios from "axios";
import ffLogo from "../assets/fflogo.jpg";

export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth(); // ✅ अब useAuth() को function के अंदर call करो
  const API = import.meta.env.VITE_API_BASE_URL;
  const [contest, setContest] = useState(null);
  const [language, setLanguage] = useState("en");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/usercontest/contest/${id}`)
      .then((res) => {
        setContest(res.data.contest);
        // ⚠️ यह गलत है क्योंकि contest details API में wallet नहीं आता अभी
        // updateUser({ wallet: res.data.wallet });
      })
      .catch((err) => console.error("Error fetching contest:", err));
  }, [id]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleJoin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("⚠ Please login to join this contest.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    try {
      const res = await axios.post(
        `${API}/usercontest/join/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "✅ Successfully joined!");
      if (res.data.wallet !== undefined) {
        updateUser({ wallet: res.data.wallet });
      }
      navigate(`/joined-contest/${id}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Failed to join contest.");
    }
  };
  if (!contest) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center text-xl">
        Loading contest details...
      </div>
    );
  }

  const formattedDate = new Date(contest.date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rules = {
    en: [
      "After joining, you will receive a WhatsApp group link — join immediately.",
      "Do not share the group link with anyone else.",
      "Your gameplay will be monitored. If cheating or hacking is detected, you will be disqualified.",
      "No refund will be given in case of rule violation.",
    ],
    hi: [
      "जॉइन करने के बाद आपको एक व्हाट्सएप ग्रुप लिंक मिलेगा — तुरंत उसमें शामिल हों।",
      "ग्रुप लिंक किसी और को शेयर न करें।",
      "आपका गेम देखा जाएगा। अगर कोई चीटिंग या हैकिंग पाई गई तो आपको डिसक्वालिफाई किया जाएगा।",
      "नियमों के उल्लंघन पर पैसे वापस नहीं किए जाएंगे।",
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg">

        {/* ✅ Logo & Title */}
        <div className="flex flex-col items-center">
          <img src={ffLogo} alt="Free Fire" className="rounded-full w-24 h-24 border-2 border-yellow-400 shadow-lg mb-3" />
          <h2 className="text-3xl font-bold text-yellow-400">{contest.title}</h2>
        </div>

        {/* ✅ Contest Info */}
        {/* ✅ Contest Info with Prize Conditions */}
        <div className="mt-6 space-y-2 text-gray-300">
          <p>
            <span className="font-semibold text-yellow-400">🎟 Entry Fee:</span> ₹{contest.entryFee}
          </p>

          {/* ✅ If 2nd & 3rd prize are not given OR 0 → show only 1st Prize */}
          {(!contest.secondPrize || contest.secondPrize <= 0) &&
            (!contest.thirdPrize || contest.thirdPrize <= 0) ? (
            <p>
              <span className="font-semibold text-yellow-400">🏆 Prize:</span> ₹{contest.firstPrize}
            </p>
          ) : (
            <>
              {/* ✅ 1st Prize */}
              <p>
                <span className="font-semibold text-yellow-400">🏆 1st Prize:</span> ₹{contest.firstPrize}
              </p>

              {/* ✅ If 2nd Prize > 0 only then show */}
              {contest.secondPrize > 0 && (
                <p>
                  <span className="font-semibold text-yellow-400">🥈 2nd Prize:</span> ₹{contest.secondPrize}
                </p>
              )}

              {/* ✅ If 3rd Prize > 0 only then show */}
              {contest.thirdPrize > 0 && (
                <p>
                  <span className="font-semibold text-yellow-400">🥉 3rd Prize:</span> ₹{contest.thirdPrize}
                </p>
              )}
            </>
          )}

          <p>
            <span className="font-semibold text-yellow-400">👥 Max Players:</span> {contest.maxPlayers}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">📅 Status:</span> {contest.status}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">⏰ Time:</span> {formattedDate}
          </p>
        </div>


        {/* ✅ Join Button */}
        <button
          onClick={handleJoin}
          className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-all"
        >
          Join Contest
        </button>

        {/* ✅ Join Message */}
        {message && (
          <p className="text-center mt-3 text-sm text-yellow-400">{message}</p>
        )}

        {/* ✅ Rules Section */}
        <div className="mt-8 bg-zinc-800 p-4 rounded-xl border border-zinc-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-yellow-400">
              {language === "en" ? "Rules & Guidelines" : "नियम और दिशानिर्देश"}
            </h3>
            <button
              onClick={toggleLanguage}
              className="text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md"
            >
              {language === "en" ? "हिंदी में देखें" : "View in English"}
            </button>
          </div>

          <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
            {rules[language].map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
