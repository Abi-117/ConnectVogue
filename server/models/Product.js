import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: String,
    hex: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    category: { type: String, required: true },
    brand: String,
    description: String,
    sizes: [String],
    colors: [colorSchema],
    image: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending", // vendor add → pending
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
