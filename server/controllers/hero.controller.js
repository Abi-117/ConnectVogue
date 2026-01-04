import HeroSlide from "../models/HeroSlide.js";

// GET all slides
export const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE slides (Admin)
export const updateHeroSlides = async (req, res) => {
  try {
    await HeroSlide.deleteMany(); // replace all
    await HeroSlide.insertMany(req.body);
    res.json({ message: "Hero slides updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
