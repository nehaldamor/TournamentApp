import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const fetchContests = async () => {
    try {
      const { data } = await axios.get(`${API}/admincontest/contests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setContests(data.contests || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Live": return "bg-blue-600";
      case "Completed": return "bg-green-600";
      default: return "bg-yellow-400 text-black";
    }
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 flex flex-col items-center">

      {/* Header + Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full max-w-5xl mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/admin/create-contest")}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg transition"
          >
            ➕ Create Contest
          </button>
          
          
        </div>
      </div>

      {/* Contest List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {loading ? (
          <p className="text-gray-400 text-center col-span-full">Loading contests...</p>
        ) : contests.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">No contests available right now.</p>
        ) : (
          contests.map((contest) => (
            <div
              key={contest._id}
              className="relative bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-2xl shadow-md hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300 p-5 flex flex-col items-center text-center"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-wide mb-2">{contest.title}</h3>

              {/* Contest Details */}
              <div className="bg-zinc-900/50 w-full rounded-lg p-3 space-y-1 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>🎟 Entry Fee:</span>
                  <span className="text-yellow-400 font-semibold">₹{contest.entryFee}</span>
                </div>

                <div className="flex justify-between">
                  <span>🏆 1st Prize:</span>
                  <span className="text-green-400 font-semibold">₹{contest.firstPrize}</span>
                </div>

                {contest.secondPrize > 0 && (
                  <div className="flex justify-between">
                    <span>🥈 2nd Prize:</span>
                    <span className="text-blue-400 font-semibold">₹{contest.secondPrize}</span>
                  </div>
                )}

                {contest.thirdPrize > 0 && (
                  <div className="flex justify-between">
                    <span>🥉 3rd Prize:</span>
                    <span className="text-purple-400 font-semibold">₹{contest.thirdPrize}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>👥 Max Players:</span>
                  <span>{contest.maxPlayers}</span>
                </div>

                <div className="flex justify-between">
                  <span>📅 Date & Time:</span>
                  <span className="text-gray-400">{formatDateTime(contest.date)}</span>
                </div>

                <div className="flex justify-between">
                  <span>📌 Status:</span>
                  <span className={`px-2 py-1 rounded-lg text-xs ${getStatusColor(contest.status)}`}>
                    {contest.status}
                  </span>
                </div>
              </div>

              {/* View Button */}
              <button
                onClick={() => navigate(`/admin/contest/${contest._id}`)}
                className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium w-full transition"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
