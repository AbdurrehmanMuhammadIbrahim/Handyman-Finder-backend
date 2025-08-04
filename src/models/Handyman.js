import mongoose, { Schema } from "mongoose";

const handymanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  services: [{ type: String, required: true, enum: ["plumber", "electrician", "ac", "carpenter", "generator", "cctv", "maintenance"] }],
  customServices: [
    {
      type: String,
      trim: true
    }
  ],
  profileImage: { type: String },
  description: {
    type: String
  },

  location: {
    city: {
      type: String,
    },
    area: {
      type: String,
    }
  },
  role: {
    type: String,
    default: "handyman"
  },
  isVerified: { type: Boolean, default: false },
  photo: { type: String },
  documents: [
    {
      url: String,
      name: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  availability: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now }
});

export const Handyman = mongoose.model('Handyman', handymanSchema);
