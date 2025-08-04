// models/User.js
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
},
 location: {
    city: {
      type: String,
    },
    area: {
      type: String,
    }
  },
  isBlocked: { type: Boolean, default: false },
 
},{timestamps:true});

export const User = mongoose.model('User', userSchema);
