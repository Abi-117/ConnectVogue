import express from "express";
import { getHeroSlides, updateHeroSlides } from "../controllers/hero.controller.js";

const router = express.Router();

router.get("/", getHeroSlides);
router.put("/", updateHeroSlides); // Admin

export default router;
