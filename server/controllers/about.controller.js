import About from "../models/About.js";

// GET About page data
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST/PUT About page data (for admin)
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
