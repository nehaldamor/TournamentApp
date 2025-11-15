import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
    const [secretCode, setSecretCode] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 👈 Toggle state
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const API=import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${API}/admin/login`, { secretCode });
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("adminToken", response.data.token);
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Secret Key");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
  <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50">
    
    {/* Heading */}
    <h2 className="text-white text-3xl font-bold text-center mb-2 tracking-wide">
      Admin Login
    </h2>
    <p className="text-gray-400 text-sm text-center mb-8">
      Enter your secret key to access the dashboard
    </p>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Secret Key Input */}
      <div>
        <label className="text-gray-300 text-sm mb-1 block">Secret Key</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Secret Key"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            className="w-full px-4 py-2.5 pr-12 bg-gray-800/70 text-white 
                       border border-gray-700 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition-all duration-300"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 
                   hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 
                   text-white font-medium shadow-lg hover:shadow-blue-500/30 
                   disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        {loading ? "Authenticating..." : "Login"}
      </button>
    </form>
  </div>
</div>

    );
};

export default AdminLogin;
