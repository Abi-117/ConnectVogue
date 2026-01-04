import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String, required: true },

    // Button 1
    btn1Text: { type: String },
    btn1Link: { type: String },

    // Button 2
    btn2Text: { type: String },
    btn2Link: { type: String },

    // Button 3
    btn3Text: { type: String },
    btn3Link: { type: String },

    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSlide", heroSlideSchema);
