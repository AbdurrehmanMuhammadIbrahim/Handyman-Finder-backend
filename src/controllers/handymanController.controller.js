import {Handyman} from "../models/Handyman.js";

// Update profile
const updateHandymanProfile = async (req, res) => {
  try {
    const handymanId = req.user.id;
    const updates = req.body;

    const updated = await Handyman.findByIdAndUpdate(handymanId, updates, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get own profile
const getHandymanProfile = async (req, res) => {
  try {
    const handymanId = req.user.id; 
    const handyman = await Handyman.findById(handymanId);

    if (!handyman) {
      return res.status(404).json({ msg: "Handyman not found" });
    }

    res.status(200).json(handyman);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// Get all verified handymen (for client app)
const getVerifiedHandymen = async (req, res) => {
  try {
    const list = await Handyman.find({ isVerified: true }).select("-password");
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get specific handyman (by ID)
const getHandymanById = async (req, res) => {
  try {
    const handyman = await Handyman.findById(req.params.id).select("-password");
    if (!handyman) return res.status(404).json({ msg: "Not found" });
    res.json(handyman);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


export {updateHandymanProfile,getVerifiedHandymen,getHandymanById,getHandymanProfile,}