// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  handymanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Handyman' },

  rating: { type: Number, required: true }, // 1 to 5
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
