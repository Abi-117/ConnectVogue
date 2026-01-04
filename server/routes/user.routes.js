import express from "express";
import {
  adminLogin,
  vendorLogin,
  createVendor,
} from "../controllers/user.controller.js";
import { getUnapprovedVendors, approveVendor } from "../controllers/adminVendor.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

// Admin login
router.post("/admin/login", adminLogin);

// Admin creates vendor
router.post("/admin/vendor", authMiddleware, adminOnly, createVendor);
router.get("/admin/vendors/pending", authMiddleware, adminOnly, getUnapprovedVendors);
router.put("/admin/vendors/:id/approve", authMiddleware, adminOnly, approveVendor);

// Vendor login
router.post("/vendor/login", vendorLogin);

export default router;
