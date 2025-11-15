import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateContest = () => {
  const [form, setForm] = useState({
    title: "",
    type: "Solo", // 🔹 default value
    entryFee: "",
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
    whatsappLink: "",
    maxPlayers: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/admincontest/contest`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.status === 201) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create contest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 flex justify-center">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm transition"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Create Contest</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter contest title"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* 🔹 Type */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Contest Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Solo">Solo</option>
              <option value="Duo">Duo</option>
              <option value="Squad">Squad</option>
            </select>
          </div>

          {/* Entry Fee */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Entry Fee</label>
            <input
              type="number"
              name="entryFee"
              value={form.entryFee}
              onChange={handleChange}
              placeholder="00"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Prizes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-300 text-sm mb-1 block">1st Prize</label>
              <input
                type="number"
                name="firstPrize"
                value={form.firstPrize}
                onChange={handleChange}
                placeholder="00"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">2nd Prize</label>
              <input
                type="number"
                name="secondPrize"
                value={form.secondPrize}
                onChange={handleChange}
                placeholder="00"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">3rd Prize</label>
              <input
                type="number"
                name="thirdPrize"
                value={form.thirdPrize}
                onChange={handleChange}
                placeholder="00"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Max Registrations */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Max Registrations</label>
            <input
              type="number"
              name="maxPlayers"
              value={form.maxPlayers}
              onChange={handleChange}
              placeholder="00"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* WhatsApp Link */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">WhatsApp Link</label>
            <input
              type="url"
              name="whatsappLink"
              value={form.whatsappLink}
              onChange={handleChange}
              placeholder="Enter WhatsApp Group Link"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Date & Time</label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Join and win Free Fire tournament!"
              rows={4}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium transition"
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContest;
