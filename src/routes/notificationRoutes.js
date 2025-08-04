// routes/notificationRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(protect(["user", "handyman"]));

router.get("/", getNotifications);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
