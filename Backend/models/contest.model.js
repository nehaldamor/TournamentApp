import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    entryFee: { type: Number, default: 50 },
    firstPrize: { type: Number, default: 0 },
    secondPrize: { type: Number, default: 0 },
    thirdPrize: { type: Number, default: 0 },
    maxPlayers: { type: Number, default: 50 },
    type: {
      type: String,
      enum: ["Solo", "Duo", "Squad"],
      default: "Squad"
    },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],

    whatsappLink: { type: String, required: true },
    // 
    status: {
      type: String,
      enum: ["Upcoming", "Live", "Completed"],
      default: "Upcoming",
    },
    date: { type: Date, required: true },

    accessCode: { type: String, unique: true, required: true },    // For automatic deletion after 2 days of completion
    expiresAt: { type: Date, default: null, index: { expires: 0 } },
  },
  { timestamps: true }
);

export default mongoose.model("Contest", contestSchema);
