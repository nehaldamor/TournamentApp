import React from "react";
import { FaWhatsapp, FaEnvelope, FaDiscord } from "react-icons/fa";

const Support = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center px-6 py-10">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 text-center">
        Support & Help
      </h2>

      <p className="text-gray-400 text-center max-w-lg mb-10">
        Need help with contests, registration, or payments?  
        Reach out to us anytime using the options below 👇
      </p>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* WhatsApp */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-6 text-center hover:shadow-yellow-400/20 transition-all duration-300">
          <FaWhatsapp className="text-green-500 text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1 text-white">WhatsApp</h3>
          <p className="text-gray-400 mb-3">Chat with our support team</p>
          <a
            href="https://wa.me/918000000000" // ⚠️ Replace with your real number
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 font-medium hover:underline"
          >
            +91 80000 00000
          </a>
        </div>

        {/* Email */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-6 text-center hover:shadow-yellow-400/20 transition-all duration-300">
          <FaEnvelope className="text-blue-400 text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1 text-white">Email</h3>
          <p className="text-gray-400 mb-3">Drop us your queries</p>
          <a
            href="mailto:support@tournamentapp.com" // ⚠️ Replace with your real email
            className="text-yellow-400 font-medium hover:underline"
          >
            support@tournamentapp.com
          </a>
        </div>

        {/* Discord */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-6 text-center hover:shadow-yellow-400/20 transition-all duration-300">
          <FaDiscord className="text-indigo-500 text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1 text-white">Discord</h3>
          <p className="text-gray-400 mb-3">Join our community</p>
          <a
            href="https://discord.gg/your-server" // ⚠️ Replace with your server link
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 font-medium hover:underline"
          >
            Join Discord
          </a>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-gray-500 text-sm mt-10 text-center max-w-md">
        Our support team is available 24/7.  
        Please allow up to 24 hours for email responses.
      </p>
    </div>
  );
};

export default Support;
