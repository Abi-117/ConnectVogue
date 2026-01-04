import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  address: String,
  phone: String,
  email: String,
  workingHours: String,
});

export default mongoose.model("SiteSettings", siteSettingsSchema);
