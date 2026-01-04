import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ======================
   ADMIN LOGIN
====================== */
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: "admin" });
  if (!admin) {
    return res.status(404).json({ msg: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    "SECRET",
    { expiresIn: "1d" }
  );

  res.json({ token });
};

/* ======================
   ADMIN → CREATE VENDOR
====================== */
export const createVendor = async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const vendor = await User.create({
    email,
    password: hashedPassword,
    role: "vendor",
    isApproved: true, // admin create pannina udane approve
  });

  res.status(201).json(vendor);
};

/* ======================
   VENDOR LOGIN
====================== */
export const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  const vendor = await User.findOne({ email, role: "vendor" });
  if (!vendor) {
    return res.status(404).json({ msg: "Vendor not found" });
  }

  if (!vendor.isApproved) {
    return res.status(403).json({ msg: "Vendor not approved" });
  }

  const isMatch = await bcrypt.compare(password, vendor.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }

  const token = jwt.sign(
    { id: vendor._id, role: vendor.role },
    "SECRET",
    { expiresIn: "1d" }
  );

  res.json({ token });
};
