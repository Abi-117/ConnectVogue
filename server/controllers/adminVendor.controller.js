import User from "../models/User.js";

export const createVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email & password required" });

    // Check if vendor already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "Vendor already exists" });

    // Create vendor (pre-save hook hashes password)
    const vendor = await User.create({
      email,
      password,
      role: "vendor",
      isApproved: true, // immediate approval, optional
    });

    res.status(201).json({ msg: "Vendor created", vendorId: vendor._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getUnapprovedVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor", isApproved: false }).select("-password");
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const approveVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await User.findById(id);

    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    vendor.isApproved = true;
    await vendor.save();

    res.json({ msg: "Vendor approved successfully", vendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
