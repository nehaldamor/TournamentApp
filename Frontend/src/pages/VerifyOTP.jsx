import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/verify-otp`, { email, otp });
      login(res.data.user, res.data.token);
      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="bg-zinc-800 p-8 rounded-xl w-80">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Verify OTP
        </h2>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white placeholder-gray-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg"
          >
            Verify OTP
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
