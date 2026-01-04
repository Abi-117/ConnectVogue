import express from "express";
import {
  getNavigation,
  createNavigation,
  updateNavigation,
  deleteNavigation,
} from "../controllers/navigation.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getNavigation);
router.post("/", adminAuth, createNavigation);
router.put("/:id", adminAuth, updateNavigation);
router.delete("/:id", adminAuth, deleteNavigation);

export default router;
