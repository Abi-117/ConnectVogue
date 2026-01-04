import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  icon: String,       // Truck, RefreshCw, Shield, Headphones
  title: String,
  description: String,
  order: Number,
});

export default mongoose.model("Feature", featureSchema);
