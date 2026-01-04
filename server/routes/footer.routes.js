import express from "express";
import { getFooter, saveFooter } from "../controllers/footer.controller.js";

const router = express.Router();

router.get("/", getFooter);
router.post("/", saveFooter); // Admin

export default router;
