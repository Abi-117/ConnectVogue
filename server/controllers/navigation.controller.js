import Navigation from "../models/Navigation.js";

export const getNavigation = async (req, res) => {
  const nav = await Navigation.find({ active: true }).sort({ order: 1 });
  res.json(nav);
};

export const createNavigation = async (req, res) => {
  const nav = await Navigation.create(req.body);
  res.status(201).json(nav);
};

export const updateNavigation = async (req, res) => {
  const nav = await Navigation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(nav);
};

export const deleteNavigation = async (req, res) => {
  await Navigation.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
