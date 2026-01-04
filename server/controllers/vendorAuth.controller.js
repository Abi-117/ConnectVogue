import User from "../models/User.js"; // your existing User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Vendor login controller
export const vendorLogin = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    console.log("LOGIN EMAIL:", email);
    console.log("LOGIN PASSWORD:", password);

    const vendor = await User.findOne({ email, role: "vendor" });
    console.log("VENDOR:", vendor);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const validPassword = await bcrypt.compare(password, vendor.password);
    console.log("PASSWORD MATCH:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // if (!vendor.isApproved) {
    //   return res.status(403).json({ message: "Vendor not approved yet" });
    // }

    const token = jwt.sign(
      { id: vendor._id, role: vendor.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Vendor login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

