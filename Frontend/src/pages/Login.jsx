import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ New loading state
  const navigate = useNavigate();
  const API=import.meta.env.VITE_API_BASE_URL;
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    try {
      const res = await axios.post(`${API}/auth/login`, { email });
      setMessage(res.data.message || "OTP sent successfully!");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error sending OTP. Please try again.");
      }
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4">
      <div className="bg-zinc-800/90 border border-zinc-700 backdrop-blur-md p-8 rounded-2xl w-full max-w-sm shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-yellow-400">Free Fire</span>{" "}
          <span className="text-white">Login</span>
        </h2>

        <p className="text-sm text-zinc-400 text-center mb-6">
          Login securely using email OTP
        </p>

        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="📱 Enter email id"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-yellow-400 outline-none text-white placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading} // ✅ Disable while loading
            className={`${
              loading
                ? "bg-zinc-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            } text-black font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-yellow-400 animate-pulse">
            {message}
          </p>
        )}

        <p className="mt-6 text-xs text-center text-zinc-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-yellow-400 hover:underline hover:text-yellow-300"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
