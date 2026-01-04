// routes/adminVendor.routes.js
import express from "express";
import { createVendor, getUnapprovedVendors, approveVendor } from "../controllers/adminVendor.controller.js";
import { verifyAdmin } from "../middleware/auth.js"; // optional: check admin token

const router = express.Router();

// Only admin can create vendor
router.post("/admin/vendor", verifyAdmin, createVendor);
router.get("/admin/vendors/pending", verifyAdmin, getUnapprovedVendors);
router.put("/admin/vendors/:id/approve", verifyAdmin, approveVendor);

export default router;
