import Category from "../models/Category.js";

// GET categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE categories (Admin)
export const updateCategories = async (req, res) => {
  try {
    await Category.deleteMany();
    await Category.insertMany(req.body);
    res.json({ message: "Categories updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
