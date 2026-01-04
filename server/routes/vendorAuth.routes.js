import express from "express";
import { vendorLogin } from "../controllers/vendorAuth.controller.js";

const router = express.Router();

// POST /api/vendor/login
router.post("/login", vendorLogin);

export default router;
