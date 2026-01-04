import express from "express";
import {
  vendorCreateProduct,
  approveProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  getApprovedProducts,
  getProductsByVendor,
  rejectProduct,
} from "../controllers/product.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { vendorOnly } from "../middleware/vendorOnly.js";

const router = express.Router();

/* =========================
   VENDOR ROUTES
========================= */

// 🔹 Vendor creates product → status: pending
router.post(
  "/vendor",
  authMiddleware,
  vendorOnly,
  vendorCreateProduct
);



router.get("/vendor", authMiddleware, vendorOnly, getProductsByVendor);

/* =========================
   ADMIN ROUTES
========================= */

// 🔹 Admin approves product
router.put(
  "/approve/:id",
  authMiddleware,
  adminOnly,
  approveProduct
);

// 🔹 Admin rejects product
router.put(
  "/reject/:id",
  authMiddleware,
  adminOnly,
  rejectProduct
);

// 🔹 Admin gets all products (optional ?status=pending)
router.get(
  "/",
  authMiddleware,
  adminOnly,
  getProducts
);

/* =========================
   PUBLIC ROUTES
========================= */

// 🔹 Public – approved products only
router.get("/public", getApprovedProducts);

// 🔹 Public – approved products by category
router.get("/category/:category", getProductsByCategory);

// 🔹 Public – single product
router.get("/:id", getProductById);

export default router;
