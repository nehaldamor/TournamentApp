import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [myContests, setMyContests] = useState([]);
  const [contestError, setContestError] = useState("");
  const [contestLoading, setContestLoading] = useState(false);
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch User Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your profile.");
          return;
        }

        const res = await axios.get(`${API}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        updateUser({ wallet: res.data.user.wallet });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  // ✅ Fetch My Contests
  useEffect(() => {
    const fetchMyContests = async () => {
      try {
        setContestLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API}/usercontest/my-contests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyContests(res.data.contests || []);
        setContestLoading(false);
      } catch (err) {
        setContestError(
          err.response?.data?.message || "Failed to load joined contests"
        );
        setContestLoading(false);
      }
    };

    fetchMyContests();
  }, []);

  // ✅ UI Loading or Error Handling
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400 text-lg font-medium">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="bg-zinc-900/90 p-8 rounded-2xl border border-zinc-700 w-full max-w-md shadow-[0_0_25px_rgba(255,215,0,0.15)] transition-all hover:shadow-yellow-500/20">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 tracking-wide">
          Player Profile 🎮
        </h2>

        <div className="space-y-5 text-white">
          {/* 🎯 Free Fire Name */}
          <div className="flex justify-between border-b border-zinc-700 pb-3">
            <span className="text-zinc-400 font-medium">🎯 Free Fire Name:</span>
            <span className="text-yellow-400 font-semibold">
              {user.freefireName || "Not Set"}
            </span>
          </div>

          {/* 🧑 User Name */}
          <div className="flex justify-between border-b border-zinc-700 pb-3">
            <span className="text-zinc-400 font-medium">🧑 User Name:</span>
            <span className="text-yellow-400 font-semibold">
              {user.userName || "Not Set"}
            </span>
          </div>

          {/* 📱 Mobile */}
          <div className="flex justify-between border-b border-zinc-700 pb-3">
            <span className="text-zinc-400 font-medium">📱 Mobile:</span>
            <span>{user.mobile}</span>
          </div>

          {/* ✉️ Email */}
          <div className="flex justify-between border-b border-zinc-700 pb-3">
            <span className="text-zinc-400 font-medium">✉️ Email:</span>
            <span>{user.email}</span>
          </div>

          {/* 💰 Wallet */}
          <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
            <span className="text-zinc-400 font-medium">💰 Wallet:</span>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-semibold">
                ₹{user.wallet || 0}
              </span>
              <button
                onClick={() => navigate("/addmoney")}
                className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Update Profile Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/update-profile")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold transition"
          >
            ✏️ Update Profile
          </button>
        </div>

        {/* ✅ My Joined Contests Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            🏆 My Joined Contests
          </h3>

          {contestLoading ? (
            <p className="text-zinc-400">Loading your contests...</p>
          ) : contestError ? (
            <p className="text-red-500">{contestError}</p>
          ) : myContests.length === 0 ? (
            <p className="text-red-500">You have not joined any contests yet.</p>
          ) : (
            <ul className="space-y-4">
              {myContests.map((contest) => (
                <li
                  key={contest._id}
                  className="bg-zinc-900 rounded-2xl border border-zinc-700 shadow-md hover:shadow-yellow-500/20 transition p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-yellow-400">
                      {contest.title}
                    </h4>
                    <span
                      className={`text-sm px-3 py-1 rounded-full font-medium ${
                        contest.status === "Completed"
                          ? "bg-green-600 text-white"
                          : contest.status === "Running"
                          ? "bg-blue-600 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {contest.status}
                    </span>
                  </div>

                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-300">
                    {/* Date & Time */}
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span className="text-zinc-400">Date:</span>
                      <span className="font-medium">{new Date(contest.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span className="text-zinc-400">Time:</span>
                      <span className="font-medium">{new Date(contest.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>

                    {/* Prizes */}
                    <div className="flex items-center gap-2">
                      <span>🥇</span>
                      <span className="text-zinc-400">1st Prize:</span>
                      <span className="text-green-400 font-medium">₹{contest.firstPrize}</span>
                    </div>
                    {contest.secondPrize > 0 && (
                      <div className="flex items-center gap-2">
                        <span>🥈</span>
                        <span className="text-zinc-400">2nd Prize:</span>
                        <span className="text-blue-400 font-medium">₹{contest.secondPrize}</span>
                      </div>
                    )}
                    {contest.thirdPrize > 0 && (
                      <div className="flex items-center gap-2">
                        <span>🥉</span>
                        <span className="text-zinc-400">3rd Prize:</span>
                        <span className="text-purple-400 font-medium">₹{contest.thirdPrize}</span>
                      </div>
                    )}

                    {/* Participants */}
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span className="text-zinc-400">Participants:</span>
                      <span className="font-medium">{contest.participants?.length || 0}</span>
                    </div>

                    {/* WhatsApp Link */}
                    <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                      <span>📱</span>
                      <span className="text-zinc-400">WhatsApp Group:</span>
                      <a
                        href={contest.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline truncate max-w-full"
                      >
                        {contest.whatsappLink}
                      </a>
                    </div>
                  </div>
                  {contest.description && (
                    <p className="text-gray-300 mt-3">{contest.description}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-center text-zinc-500 text-xs mt-6">
          “Play fair, stay sharp, and rise to the top 🔥”
        </p>
      </div>
    </div>
  );
}
