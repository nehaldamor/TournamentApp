import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [freefireName, setfreefireName] = useState("");
  const [userName, setUserName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("send");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Button Loading State
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Button Loading Start
    try {
      const res = await axios.post(`${API}/auth/send-otp`, {
        mobile,
        freefireName,
        userName,
        email,
      });
      setMessage(res.data.message || "OTP sent successfully!");
      setStep("verify");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP.");
    } finally {
      setLoading(false); // ✅ End Loading
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Loading Start
    try {
      const res = await axios.post(`${API}/auth/verify-otp`, {
        email,
        otp,
      });
      login(res.data.user, res.data.token);
      setMessage("Registration successful!");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false); // ✅ End Loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 text-white px-4">
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-yellow-500/30 shadow-yellow-400/20 shadow-lg rounded-2xl w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-yellow-400">FF Tournament</h1>
          <p className="text-gray-400 text-sm">Register to join competitive battles 🔥</p>
        </div>

        {/* ✅ Step 1: Send OTP */}
        {step === "send" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4 text-left">
            <label className="text-sm text-gray-300">User Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            <label className="text-sm text-gray-300">Free Fire Name</label>
            <input
              type="text"
              placeholder="Enter your in-game name"
              className="input-field"
              value={freefireName}
              onChange={(e) => setfreefireName(e.target.value)}
              required
            />

            <label className="text-sm text-gray-300">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="input-field"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-all shadow-md 
              ${loading && "opacity-50 cursor-not-allowed"}`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          // ✅ Step 2: Verify OTP
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 text-left">
            <label className="text-sm text-gray-300">Email</label>
            <input type="text" value={email} readOnly className="input-field text-gray-400" />

            <label className="text-sm text-gray-300">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="input-field"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-all shadow-md 
              ${loading && "opacity-50 cursor-not-allowed"}`}
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
          </form>
        )}

        {message && (
          <p className={`mt-4 text-sm ${message.includes("error") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
