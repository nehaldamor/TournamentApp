import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE_URL;

  const fetchContestDetails = async () => {
    try {
      setLoading(true);
      const { data: contestData } = await axios.get(`${API}/admincontest/contest/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setContest(contestData.contest);

      const { data: playersData } = await axios.get(`${API}/admincontest/${id}/players`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setPlayers(playersData.players || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContestDetails();
  }, [id]);

const [updatingId, setUpdatingId] = useState(null);

const markAsCompleted = async (id) => {
  // Ask for confirmation
  const isConfirmed = window.confirm("Are you sure you want to mark this contest as Completed?");
  if (!isConfirmed) return; // if user clicks "Cancel", stop execution

  try {
    setUpdatingId(id);
    await axios.put(
      `${API}/admincontest/contest/${id}/complete`,
      {}, // empty body
      { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
    );
    alert("Contest marked as completed!");
    fetchContestDetails(); // refresh the contest data
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Failed to update status");
  } finally {
    setUpdatingId(null);
  }
};

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const getStatusColor = (status) => {
    return status === "Completed"
      ? "bg-green-600"
      : status === "Live"
      ? "bg-blue-600"
      : "bg-yellow-500 text-black";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm transition"
      >
        ← Back to Dashboard
      </button>
     
      {loading ? (
        <p className="text-gray-400 text-center">Loading contest details...</p>
      ) : !contest ? (
        <p className="text-gray-400 text-center">Contest not found.</p>
      ) : (
        <>
          {/* Contest Info */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-md border border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-400">{contest.title}</h2>
              <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(contest.status)}`}>
                {contest.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300 text-sm">
              <p>📅 Date: {formatDateTime(contest.date)}</p>
              <p>🎟 Entry Fee: ₹{contest.entryFee}</p>
              <p>👥 Max Players: {contest.maxPlayers}</p>
              <p>🏆 1st Prize: ₹{contest.firstPrize}</p>
              {contest.secondPrize > 0 && <p>🥈 2nd Prize: ₹{contest.secondPrize}</p>}
              {contest.thirdPrize > 0 && <p>🥉 3rd Prize: ₹{contest.thirdPrize}</p>}
              <a href={contest.whatsappLink} target="_blank" className="text-blue-400 hover:underline col-span-full">
                WhatsApp Group
              </a>
            </div>

            {contest.description && (
              <p className="text-gray-300 mt-4">{contest.description}</p>
            )}
             <button
                onClick={() => navigate(`/admin/update-contest/${contest._id}`)}
                className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium w-full transition"
              >
                Update Contest
              </button>
              <button
                onClick={() => markAsCompleted(contest._id)}
                className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium w-full transition"
              >
                Mark As Completed
              </button>
          </div>
         
            
          {/* Players List as Cards */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              Joined Players ({players.length})
            </h3>

            {players.length === 0 ? (
              <p className="text-gray-400 text-center">No players have joined this contest yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700 hover:shadow-yellow-500/30 transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-blue-400">{player.userName}</h4>
                    <p className="text-gray-300 text-sm">🎮 Free Fire: {player.freefireName}</p>
                    <p className="text-gray-300 text-sm">📱 Mobile: {player.mobile}</p>
                    <p className="text-gray-300 text-sm">✉️ Email: {player.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContestDetails;
