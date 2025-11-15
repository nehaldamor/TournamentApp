import React, { useState } from "react";
import axios from "axios";
import { useAuth  } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_BASE_URL;
const WalletAdd = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add money!");
      return;
    }

    try {
      setLoading(true);

      // ✅ Step 1: Create Order with token
      const { data: order } = await axios.post(
        `${API}/payment/create-order`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ✅ Razorpay Payment Window Options (UPI Enabled)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Khelo FF",
        description: "Add Money to Wallet",
        order_id: order.orderId,

        handler: async function (response) {
          await axios.post(
            `${API}/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: Number(amount),  // ✅ only amount
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          updateUser({ wallet: Number(user.wallet || 0) + Number(amount) });
          alert("Payment Successful! ✅");
          navigate("/profile");
        },

        // ✅ Correct way to enable all payment methods
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        // ✅ UPI intent support (GPay, PhonePe auto-open)
        upi: {
          flow: "intent",
        },

        theme: { color: "#F59E0B" }
      };


      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Payment Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Add Money to Wallet</h2>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 mb-3 bg-zinc-700 border border-zinc-600 rounded-lg outline-none text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-black font-semibold p-2 rounded-lg"
        >
          {loading ? "Processing..." : "Add Money"}
        </button>
      </div>
    </div>
  );
};

export default WalletAdd;
