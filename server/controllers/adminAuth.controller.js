import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find admin by email
    const user = await User.findOne({ email, role: "admin" });
    if (!user) return res.status(404).json({ msg: "Admin not found" });

    // 2️⃣ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    // 3️⃣ Admins are always approved
    // (vendors will need isApproved check)

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
