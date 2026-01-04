import mongoose from "mongoose";
import Product from "../models/productdetails.model.js";

/* ================= GET ALL ================= */
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

/* ================= GET SINGLE PRODUCT ================= */
export const getProductById = async (req, res) => {
  const { id } = req.params;

  // ✅ STOP invalid ids like "trending", "new"
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(null); // no error, no crash
  }

  const product = await Product.findById(id);
  res.json(product);
};

/* ================= GET RELATED PRODUCTS ================= */
export const getRelatedProducts = async (req, res) => {
  const { id } = req.params;

  // ✅ Protect here also
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json([]);
  }

  const product = await Product.findById(id);
  if (!product) return res.json([]);

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).limit(4);

  res.json(related);
};

/* ================= ADMIN SAVE ================= */
export const saveProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.body._id,
    req.body,
    { upsert: true, new: true }
  );
  res.json(product);
};

/* ================= DELETE ================= */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ success: false });
  }

  await Product.findByIdAndDelete(id);
  res.json({ success: true });
};
