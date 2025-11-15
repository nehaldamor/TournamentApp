import React from "react";
import { FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* 🌟 Brand / App Name */}
        <div className="text-white font-semibold text-lg">
          FreeFire Tournaments
        </div>

        {/* 🔗 Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Contests</a>
          <a href="#" className="hover:text-white transition">Results</a>
          <Link to='/support' className="hover:text-white transition">Support</Link>
        </div>

        {/* 🔥 Social Icons */}
        <div className="flex gap-5 text-xl">
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaYoutube />
          </a>
          <a href="#" className="hover:text-indigo-500 transition">
            <FaDiscord />
          </a>
        </div>
      </div>

      {/* 🧾 Bottom Line */}
      <div className="text-center text-xs text-gray-600 mt-4">
        © {new Date().getFullYear()} FreeFire Tournaments. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
