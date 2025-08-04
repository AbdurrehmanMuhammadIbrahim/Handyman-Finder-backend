import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    handyman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Handyman",
      required: true,
    },
    date: String,        // e.g., "2025-07-01"
    time: String,        // e.g., "3:00 PM"
    location: String,    // optional: e.g., "House #123, DHA Phase 5"
    description: String, // optional issue description
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
