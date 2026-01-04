import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const footerSchema = new mongoose.Schema(
  {
    brandName: String,
    description: String,
    logo: String,

    socials: {
      instagram: String,
      facebook: String,
      twitter: String,
    },

    quickLinks: [linkSchema],
    customerService: [linkSchema],

    contact: {
      address: String,
      phone: String,
      email: String,
      workingHours: String,
    },

    bottomText: String,
  },
  { timestamps: true }
);

export default mongoose.model("Footer", footerSchema);
