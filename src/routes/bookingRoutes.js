import express from "express";
import {
  createBooking,
  getMyBookingsHandyman,
  getMyBookingsCustomer,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Customer creates a booking
router.post("/", protect(["user"]), createBooking);

// Handyman views his bookings
router.get("/handyman", protect(["handyman"]), getMyBookingsHandyman);

// Customer views their bookings
router.get("/customer", protect(["user"]), getMyBookingsCustomer);

// Handyman updates booking status
router.put("/:id/status", protect(["handyman"]), updateBookingStatus);

export default router;
