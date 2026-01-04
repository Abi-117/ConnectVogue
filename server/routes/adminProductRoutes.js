import express from "express";

import {
  createProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
} from "../controllers/adminProduct.js";

const router = express.Router();

// Admin
router.post("/", createProduct);

// Public
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

export default router;