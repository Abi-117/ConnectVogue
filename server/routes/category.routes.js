import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ order: 1 });
  res.json(categories);
});

router.put("/", async (req, res) => {
  await Category.deleteMany();
  await Category.insertMany(req.body);
  res.json({ success: true });
});

export default router;
