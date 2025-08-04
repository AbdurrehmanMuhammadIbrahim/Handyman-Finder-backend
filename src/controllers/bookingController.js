import Booking from "../models/Booking.model.js";
import Notification from "../models/Notification.js";

// 1. Create a booking
// export const createBooking = async (req, res) => {
//   try {
//     const { handymanId, date, time, location, description } = req.body;

//     const booking = await Booking.create({
//       customer: req.user.id,
//       handyman: handymanId,
//       date,
//       time,
//       location,
//       description,
//     });

//     res.status(201).json(booking);
//   } catch (err) {
//     console.error("Booking Error:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };


export const createBooking = async (req, res) => {
  try {
    const { handymanId, date, time, location, description } = req.body;

    const booking = await Booking.create({
      customer: req.user._id,
      handyman: handymanId,
      date,
      time,
      location,
      description,
    });
// 🔔 Create notification for handyman
    await Notification.create({
      recipient: handymanId,
      recipientModel: "Handyman",
      message: `You have a new booking on ${date} at ${time}`,
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 2. Handyman: View all my bookings
export const getMyBookingsHandyman = async (req, res) => {
  try {
    const bookings = await Booking.find({ handyman: req.user.id }).populate("customer", "name phone");
    res.json(bookings);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// 3. Customer: View my bookings
export const getMyBookingsCustomer = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id }).populate("handyman", "name services city");
    res.json(bookings);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// 4. Handyman: Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status,time,date } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    // Only handyman can update status
    
    if (booking.handyman.toString() !== req.user.id)
     return res.status(403).json({ msg: "Unauthorized" });

    booking.status = status;
    booking.time = time;
    booking.date = date;
    await booking.save();

    // Notify customer
    await Notification.create({
      recipient: booking.customer,
      recipientModel: "User",
      message: `Your booking has been marked as ${status}`,
    });

    res.json(booking);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
