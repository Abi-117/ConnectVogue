import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: String,
    hex: String,
  },
  { _id: false }
);

const adminProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,

    category: { type: String, required: true }, // store category slug
    brand: String,
    description: String,

    sizes: { type: [String], default: [] },
    colors: { type: [colorSchema], default: [] },

    image: { type: String, default: "" }, // URL

    // Optional fields for frontend filters
    isNew: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AdminProduct", adminProductSchema);