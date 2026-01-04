import mongoose from "mongoose";

const CompanyContactSchema = new mongoose.Schema(
  {
    address: String,
    phone: String,
    email: String,
    workingHours: String,
  },
  { timestamps: true }
);

export default mongoose.model("CompanyContact", CompanyContactSchema);
