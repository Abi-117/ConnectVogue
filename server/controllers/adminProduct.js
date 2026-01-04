import Product from "../models/Adminproduct.js";

// Admin – create product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public – get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Category-wise products
export const getProductsByCategory = async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
};

// Single product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};