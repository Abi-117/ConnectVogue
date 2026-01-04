import express from "express";
import {
  getProducts,
  getProductById,
  getRelatedProducts,
  saveProduct,
  deleteProduct,
} from "../controllers/productdetails.controller.js";

const router = express.Router();

router.get("/", getProducts);

// ✅ IMPORTANT: related route MUST be before :id
router.get("/related/:id", getRelatedProducts);
router.get("/:id", getProductById);

router.post("/", saveProduct);        // Admin
router.delete("/:id", deleteProduct); // Admin

export default router;
