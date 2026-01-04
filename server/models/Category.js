import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // men, women
  image: String,
  order: Number,
});

export default mongoose.model("Category", CategorySchema);
