import SiteSettings from "../models/SiteSettings.js";

export const getSettings = async (req, res) => {
  const settings = await SiteSettings.findOne();
  res.json(settings);
};

export const updateSettings = async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );
  res.json(settings);
};
