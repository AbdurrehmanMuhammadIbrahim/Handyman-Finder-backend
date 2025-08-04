import express from "express";

const router = express.Router();
import {
  updateHandymanProfile,
  getVerifiedHandymen,
  getHandymanById,
  getHandymanProfile,
} from "../controllers/handymanController.controller.js";

import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { Handyman } from "../models/Handyman.js";

// Update own profile (Handyman only)
router.put("/me", protect(["handyman"]), updateHandymanProfile);

router.post("/me/image",
  protect(["handyman"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const handyman = await Handyman.findByIdAndUpdate(req.user._id);
      if (!handyman) return res.status(404).json({
        msg: "Handyman not found"

      });
      if (!handyman) {
        console.log("Handyman not found");

      }

      handyman.profileImage = req.file.path; // Cloudinary image URL
      await handyman.save();

      res.json({ msg: "Image uploaded", url: handyman.profileImage });
    } catch (err) {
      console.error("Image Upload Error:", err);
      res.status(500).json({ msg: "Image upload failed" });
    }
  }
);

router.put("/me/image",
  protect(["handyman"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const handyman = await Handyman.findById(req.user._id);
      if (!handyman) {
        return res.status(404).json({ msg: "Handyman not found" });
      }

      // 🌟 Check for Cloudinary URL
      const imageUrl = req.file?.path || req.file?.url;
      if (!imageUrl) {
        return res.status(400).json({ msg: "No image uploaded" });
      }

      handyman.profileImage = imageUrl;
      await handyman.save();
      res.json({ msg: "Image uploaded successfully", url: imageUrl });
    } catch (err) {
      console.error("Image Upload Error:", err);
      res.status(500).json({ msg: "Image upload failed" });
    }
  }
);


router.post(
  "/me/documents",
  protect(["handyman"]),
  upload.array("documents", 5),
  async (req, res) => {
    try {
      const handyman = await Handyman.findById(req.user._id);
      if (!handyman) return res.status(404).json({ msg: "Handyman not found" });

      const uploadedDocs = req.files?.map((file) => ({
        url: file.path,
        name: file.originalname, // ✅ add name from original filename
      })) || [];

      handyman.documents.push(...uploadedDocs);

      await handyman.save();

      res.json({ msg: "Documents uploaded", documents: handyman.documents });
    } catch (err) {
      console.error("Document Upload Error:", err);
      res.status(500).json({ msg: err.message || "Upload failed" });
    }
  }
);

router.get("/profile", protect(["handyman"]), getHandymanProfile);

// Public Routes
router.get("/", getVerifiedHandymen);
router.get("/:id", getHandymanById);

export default router;
