import bcrypt from "bcrypt";
import {User} from "../models/User.js";
import {Handyman} from "../models/Handyman.js";
import {generateToken} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// Allowed services list
const allowedServices = [
  "plumber",
  "electrician",
  "ac",
  "carpenter",
  "generator",
  "cctv",
  "maintenance",
  "other"
];

// Register
// const register = async (req, res) => {

//    try {
//     const { name, phone, password, role, services = [] } = req.body;

//     const existing =
//       role === "handyman"
//         ? await Handyman.findOne({ phone })
//         : role === "admin"
//         ? await User.findOne({ phone, role: "admin" })
//         : await User.findOne({ phone });

//     if (existing) return res.status(400).json({ msg: "Phone already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     let newUser;

//     if (role === "handyman") {
//       // Separate predefined and custom services
//       const selectedServices = [];
//       const customServices = [];

//       services.forEach(service => {
//         const serviceLower = service.toLowerCase();
//         if (allowedServices.includes(serviceLower)) {
//           selectedServices.push(serviceLower);
//         } else {
//           customServices.push(service.trim());
//         }
//       });

//       if (selectedServices.length + customServices.length === 0) {
//         return res.status(400).json({ msg: "At least one valid service is required" });
//       }

//       newUser = await Handyman.create({
//         name,
//         phone,
//         password: hashed,
//         services: selectedServices,
//         customServices
//       });
//  } else {
//       newUser = await User.create({ name, phone, password: hashed,role });
//     }

//     const token = generateToken(newUser._id, role);
//     res.json({ token, role, user: newUser });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };



const register = async (req, res) => {
  try {
    const { name, phone, password, role, services = [] } = req.body;

    // 🔒 Check if phone already exists in either collection
    const handymanExists = await Handyman.findOne({ phone });
    const userExists = await User.findOne({ phone });

    if (handymanExists || userExists) {
      return res.status(400).json({ msg: "Phone number is already registered" });
    }
    

    // 🔐 Hash the password
    const hashed = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "handyman") {
      // 🛠️ Separate allowed and custom services
      const selectedServices = [];
      const customServices = [];

      services.forEach(service => {
        const serviceLower = service.toLowerCase();
        if (allowedServices.includes(serviceLower)) {
          selectedServices.push(serviceLower);
        } else {
          customServices.push(service.trim());
        }
      });

      if (selectedServices.length + customServices.length === 0) {
        return res.status(400).json({ msg: "At least one valid service is required" });
      }

      // 👷 Create Handyman
      newUser = await Handyman.create({
        name,
        phone,
        password: hashed,
        services: selectedServices,
        customServices
      });

    } else {
      // 👤 Create regular user (or admin)
      newUser = await User.create({
        name,
        phone,
        password: hashed,
        role
      });
    }

    // 🔑 Generate token
    const token = generateToken(newUser._id, role);

    // ✅ Success response
    res.status(201).json({
      msg: "Registration successful",
      token,
      role,
      user: newUser
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// Login
// const login = async (req, res) => {
//   try {
//     const { phone, password, role,services } = req.body;

//     const user =
//       role === "handyman"
//         ? await Handyman.findOne({ phone })
//         : await User.findOne({ phone });

//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = generateToken(user._id, role);
//     res.json({ token, role, user });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };




// Login
// const login = async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     let user = await Handyman.findOne({ phone });
//     let role = "handyman";

//     if (!user) {
//       user = await User.findOne({ phone });
//       role = user?.role || "user";
//     }

//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = generateToken(user._id, role);
//     res.json({ token, role, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     let user = await User.findOne({ phone }) ||  Handyman.findOne({ phone })

//     // if (role === "handyman") {
//     //   user = await Handyman.findOne({ phone });
//     // } else if (role === "admin") {
//     //   user = await User.findOne({ phone, role: "admin" });
//     // } else {
//     //   user = await User.findOne({ phone, role: "user" });
//     // }

//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = generateToken(user._id, role);
//     res.json({ token, role, user });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };




const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    let user = await User.findOne({ phone });
    let role = "user";

    if (!user) {
      user = await Handyman.findOne({ phone });
      role = "handyman";
    }

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id, user.role);
    res.json({ token, role, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


 const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === "handyman") {
      user = await Handyman.findById(decoded.id).select("-password");
    } else {
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({
      user,
      role: decoded.role,
    });

  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};


// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const updated = await User.findByIdAndUpdate(userId, updates, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get own profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId,).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export {register,login,verifyToken,updateUserProfile,getUserProfile}