import { User } from "../models/User.js";
import { Handyman } from "../models/Handyman.js";
import Booking from "../models/Booking.model.js";

// Get all customers
export const getAllUsers = async (req, res) => {

  try {
    const users = await User.find().select("-password");
    const handymen = await Handyman.find().select("-password");

    res.json({ users, handymen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all handyman
export const getAllhandyman = async (req, res) => {
  const handyman = await Handyman.find().select("-password");
  res.json(handyman);
};

// Verify/unverify handyman
export const toggleHandymanVerification = async (req, res) => {
  const handyman = await Handyman.findById(req.params.id);
  if (!handyman) return res.status(404).json({ msg: "Not found" });

  handyman.isVerified = !handyman.isVerified;
  await handyman.save();

  res.json({ msg: `Handyman ${handyman.isVerified ? "verified" : "unverified"}` });
};

// Delete customer
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};

// Delete handyman
export const deleteHandyman = async (req, res) => {
  await Handyman.findByIdAndDelete(req.params.id);
  res.json({ msg: "Handyman deleted" });
};

// Dashboard stats
export const getStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const handymanCount = await Handyman.countDocuments();
  const bookingCount = await Booking.countDocuments();

  res.json({ users: userCount, handyman: handymanCount, bookings: bookingCount });
};

//view handyman documents
export const getHandymanDocuments = async (req, res) => {
  try {
    const handyman = await Handyman.findById(req.params.id).select("name documents");

    if (!handyman) return res.status(404).json({ msg: "Handyman not found" });

    res.json({
      name: handyman.name,
      documents: handyman.documents
    });
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
