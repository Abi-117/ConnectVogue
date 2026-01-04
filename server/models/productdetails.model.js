import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    originalPrice: Number,
    image: String,
    description: String,
    category: String,

    sizes: [String],
    colors: [
      {
        name: String,
        hex: String,
      },
    ],

    isNew: Boolean,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
