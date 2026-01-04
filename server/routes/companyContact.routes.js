import express from "express";
import {
  getCompanyContact,
  upsertCompanyContact,
} from "../controllers/companyContact.controller.js";

const router = express.Router();

router.get("/", getCompanyContact);
router.post("/", upsertCompanyContact); // admin update

export default router;
