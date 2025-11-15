import crypto from "crypto";
import razorpay from "../utils/razorpay.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, currency: order.currency, amount: order.amount });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const user = await User.findById(userId);

      // ✅ Safely Convert and Add Amount
      const addAmount = Number(amount);
      const currentWallet = Number(user.wallet) || 0;

      user.wallet = currentWallet + addAmount;

      await user.save();

      res.status(200).json({
        message: "Payment verified & wallet updated ",
        wallet: user.wallet,
      });
    } else {
      res.status(400).json({ message: "Invalid signature " });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
};

