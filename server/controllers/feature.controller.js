import Feature from "../models/Feature.js";

// GET features
export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ order: 1 });
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE features (Admin)
export const updateFeatures = async (req, res) => {
  try {
    await Feature.deleteMany();
    await Feature.insertMany(req.body);
    res.json({ message: "Features updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
