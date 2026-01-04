import express from "express";
import { getAbout, updateAbout } from "../controllers/about.controller.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", updateAbout); // ✅ PUT (NOT POST)

export default router;
