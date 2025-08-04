import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Handyman } from "../models/Handyman.js";

const protect = (allowedRoles = []) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    if (decoded.role === "handyman") {
      user = await Handyman.findById(decoded.id);
    }
    else if (decoded.role === "admin") {
      user = await User.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    req.user = user;
    req.user.role = decoded.role;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ msg: "Token invalid or expired" });
  }
};

export default protect;
