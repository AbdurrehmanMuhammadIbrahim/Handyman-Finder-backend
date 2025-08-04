import express from "express";
import {
  getAllUsers,
  getAllhandyman,
  toggleHandymanVerification,
  deleteUser,
  deleteHandyman,
  getStats,
  getHandymanDocuments
} from "../controllers/adminController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", protect(["admin"]), getAllUsers);
router.get("/handyman", protect(["admin"]), getAllhandyman);
router.put("/verify/:id", protect(["admin"]), toggleHandymanVerification);
router.delete("/users/:id", protect(["admin"]), deleteUser);
router.delete("/handyman/:id", protect(["admin"]), deleteHandyman);
router.get("/stats", protect(["admin"]), getStats);
router.get('/:id/documents', protect(['admin']), getHandymanDocuments);

export default router;
