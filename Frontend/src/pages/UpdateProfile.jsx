import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export default function UpdateProfile() {
  const [form, setForm] = useState({
    freefireName: "",
    userName: "",
    mobile: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetch profile details
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        freefireName: res.data.user.freefireName,
        userName: res.data.user.userName,
        mobile: res.data.user.mobile,
       
      });
       setEmail(res.data.user.email);
    };
    fetchUser();
  }, []);

  // timer for resend otp
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // send otp
  const handleSendOTP = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/auth/login`,
        {email},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOtpSent(true);
      setTimer(60);
      alert("OTP sent to your registered email.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // verify otp and update profile
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/auth/verify-otp`,
        { email, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-zinc-900 w-full max-w-md p-6 rounded-2xl border border-zinc-700 shadow-lg">
        <h2 className="text-yellow-400 text-2xl font-bold text-center mb-6">
          Update Profile 🔐
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-1">🎯 Free Fire Name</label>
            <input
              name="freefireName"
              value={form.freefireName}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">🧑 User Name</label>
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">📱 Mobile</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Step Control */}
        {!otpSent ? (
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold"
          >
            {loading ? "Sending OTP..." : "Send OTP to Email"}
          </button>
        ) : (
          <div className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Verifying..." : "Verify & Update"}
            </button>

            {timer > 0 ? (
              <p className="text-center text-zinc-400 text-sm">
                Resend OTP in {timer}s
              </p>
            ) : (
              <button
                onClick={handleSendOTP}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold"
              >
                Resend OTP 
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
