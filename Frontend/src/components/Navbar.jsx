import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-zinc-900 text-white py-4 px-6 flex justify-between items-center shadow-md relative">
      {/* 🔥 Logo */}
      <Link
        to="/"
        className="text-red-600 text-xl font-bold tracking-wide"
        onClick={() => setMenuOpen(false)}
      >
        Khelo FF
      </Link>

      {/* 💻 Desktop Menu */}
      <div className="hidden sm:flex gap-4 items-center">
        {user ? (
          <>
            {/* ✅ Wallet Button */}
            <button
              onClick={() => navigate("/add-wallet")}
              className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
            >
              💰 Wallet: ₹{user.wallet}
            </button>

            <Link
              to="/profile"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg font-medium"
            >
              Profile
            </Link>

            <Link
              to="/support"
              className="border border-yellow-400 text-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black font-medium"
            >
              Support
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-yellow-400 text-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* 📱 Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden text-yellow-400 text-2xl focus:outline-none"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg w-48 flex flex-col py-3 z-50">
          {user ? (
            <>
              {/* ✅ Clickable Wallet */}
              <button
                onClick={() => {
                  navigate("/add-wallet");
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 text-yellow-400 font-semibold hover:bg-zinc-800 w-full text-left"
              >
                💰 Wallet: ₹{user.wallet}
              </button>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-zinc-800 text-gray-200"
              >
                Profile
              </Link>

              <Link
                to="/support"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-zinc-800 text-gray-200"
              >
                Contact
              </Link>

              <button
                onClick={handleLogout}
                className="block text-left w-full px-4 py-2 text-red-400 hover:bg-zinc-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-zinc-800 text-gray-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-zinc-800 text-gray-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
