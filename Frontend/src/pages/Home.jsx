import { useEffect, useState } from "react";
import axios from "axios";
import ffLogo from "../assets/fflogo.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const [selectedType, setSelectedType] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const types = ["All", "Solo", "Duo", "Squad"];

  // ✅ Get color for contest status
  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return "text-green-400";
      case "Upcoming":
        return "text-yellow-400";
      case "Completed":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  // ✅ Format date nicely
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";

    return date.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Fetch contests once
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get(`${API}/usercontest/contests`);
        const data = res.data.contests || [];
        setContests(data);
        setFilteredContests(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  // ✅ Filter contests by type
  const handleFilterClick = (type) => {
    setSelectedType(type);
    setShowDropdown(false);

    if (type === "All") {
      setFilteredContests(contests);
    } else {
      const filtered = contests.filter(
        (contest) => contest.type?.toLowerCase() === type.toLowerCase()
      );
      setFilteredContests(filtered);
    }
  };

  const buttonStyle = (type) =>
    `px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
      selectedType === type
        ? "bg-blue-600 text-white shadow-lg scale-105"
        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
    }`;

  // ✅ Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-yellow-400 text-lg">Loading contests...</p>
      </div>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-5 px-4">
      {/* ✅ Filter Section */}
      <div className="bg-black h-32 flex justify-center items-center shadow-inner relative z-20 overflow-visible">
  {/* 🌐 Desktop View */}
  <div className="hidden sm:flex gap-6">
    {types.map((type) => (
      <button
        key={type}
        className={buttonStyle(type)}
        onClick={() => handleFilterClick(type)}
      >
        {type}
      </button>
    ))}
  </div>

  {/* 📱 Mobile View */}
  <div className="sm:hidden relative w-40">
    <button
      className="w-full bg-gray-800 text-gray-200 py-2 px-4 rounded-lg flex justify-between items-center cursor-pointer"
      onClick={() => setShowDropdown((prev) => !prev)}
    >
      {selectedType}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
          showDropdown ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {showDropdown && (
      <div className="absolute top-full mt-2 w-full bg-gray-900 rounded-lg border border-gray-700 shadow-lg z-30 overflow-visible">
        {types.map((type) => (
          <div
            key={type}
            onClick={() => {
              handleFilterClick(type);
              setShowDropdown(false);
            }}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
              selectedType === type ? "bg-gray-800 text-white" : "text-gray-300"
            }`}
          >
            {type}
          </div>
        ))}
      </div>
    )}
  </div>
</div>


      {/* ✅ Heading */}
      <h2 className="text-3xl font-semibold mb-8 text-yellow-400 text-center">
        Upcoming Contests
      </h2>

      {/* ✅ Contests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
            <div
              key={contest._id}
              className="relative bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-2xl shadow-md hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300 p-5 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                <img
                  src={ffLogo}
                  alt="Free Fire"
                  className="rounded-full w-20 h-20 border-2 border-yellow-400 shadow-lg mb-2"
                />

                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {contest.title}
                </h3>

                <div className="bg-zinc-900/50 w-full rounded-lg p-3 space-y-1 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>🎟 Entry Fee:</span>
                    <span className="text-yellow-400 font-semibold">₹{contest.entryFee}</span>
                  </div>

                  {(!contest.secondPrize || contest.secondPrize <= 0) &&
                    (!contest.thirdPrize || contest.thirdPrize <= 0) && (
                      <div className="flex justify-between">
                        <span>🏆 Prize:</span>
                        <span className="text-green-400 font-semibold">₹{contest.firstPrize}</span>
                      </div>
                    )}

                  {(contest.secondPrize > 0 || contest.thirdPrize > 0) && (
                    <>
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
                    </>
                  )}

                  <div className="flex justify-between">
                    <span>👥 Max Players:</span>
                    <span>{contest.maxPlayers}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>📅 Status:</span>
                    <span className={`${getStatusColor(contest.status)} font-semibold`}>
                      {contest.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>⏰ Time:</span>
                    <span className="text-gray-400 text-sm">{formatDateTime(contest.date)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/contest/${contest._id}`)}
                  className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium w-full transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg text-center col-span-full">
            No contests available for this type.
          </p>
        )}
      </div>
    </div>
  );
}
