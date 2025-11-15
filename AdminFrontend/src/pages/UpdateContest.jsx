import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [contest, setContest] = useState({
    title: "",
    entryFee: "",
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
    whatsappLink: "",
    date: "",
    description: "",
    maxPlayers: "",
  });

  // Fetch contest by ID
  const fetchContest = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admincontest/contest/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (data?.contest) {
        const c = data.contest;
        setContest({
          title: c.title || "",
          entryFee: c.entryFee || "",
          firstPrize: c.firstPrize || "",
          secondPrize: c.secondPrize || "",
          thirdPrize: c.thirdPrize || "",
          whatsappLink: c.whatsappLink || "",
          date: c.date ? c.date.slice(0, 16) : "", // for datetime-local input
          description: c.description || "",
          maxPlayers: c.maxPlayers || "",
        });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContest();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setContest({ ...contest, [e.target.name]: e.target.value });
  };

  // Submit updated contest
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await axios.put(
        `${API}/admincontest/contest/${id}`,
        { ...contest },
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      alert("Contest updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm transition"
      >
        ← Back to Dashboard
      </button>

      {loading ? (
        <p className="text-gray-400 text-center">Loading contest details...</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
            Update Contest
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-gray-300 mb-1 block">Title</label>
              <input
                type="text"
                name="title"
                value={contest.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Entry Fee */}
            <div>
              <label className="text-gray-300 mb-1 block">Entry Fee</label>
              <input
                type="number"
                name="entryFee"
                value={contest.entryFee}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Prizes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-300 mb-1 block">1st Prize</label>
                <input
                  type="number"
                  name="firstPrize"
                  value={contest.firstPrize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 mb-1 block">2nd Prize</label>
                <input
                  type="number"
                  name="secondPrize"
                  value={contest.secondPrize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-300 mb-1 block">3rd Prize</label>
                <input
                  type="number"
                  name="thirdPrize"
                  value={contest.thirdPrize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Max Players */}
            <div>
              <label className="text-gray-300 mb-1 block">Max Players</label>
              <input
                type="number"
                name="maxPlayers"
                value={contest.maxPlayers}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* WhatsApp Link */}
            <div>
              <label className="text-gray-300 mb-1 block">WhatsApp Link</label>
              <input
                type="url"
                name="whatsappLink"
                value={contest.whatsappLink}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-gray-300 mb-1 block">Date & Time</label>
              <input
                type="datetime-local"
                name="date"
                value={contest.date}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-300 mb-1 block">Description</label>
              <textarea
                name="description"
                value={contest.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:bg-gray-600"
            >
              {submitting ? "Updating..." : "Update Contest"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateContest;
