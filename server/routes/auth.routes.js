import express from "express";
import { vendorLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/vendor/login", vendorLogin);


export default router;
