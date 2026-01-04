import mongoose from "mongoose";
import dotenv from "dotenv";
import Navigation from "../models/Navigation.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Navigation.deleteMany();

  await Navigation.insertMany([
    { label: "Men", href: "/men", order: 1 },
    { label: "Women", href: "/women", order: 2 },
    { label: "Shoes", href: "/shoes", order: 3 },
    { label: "Garments", href: "/garments", order: 4 },
    { label: "Electronics", href: "/electronics", order: 5 },
    { label: "Gift Items", href: "/gift-items", order: 6 },
  ]);

  console.log("Navigation seeded");
  process.exit();
};

seed();
