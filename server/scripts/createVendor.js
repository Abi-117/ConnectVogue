import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "vendor1@gmail.com";
  const password = "Admin@123";

  await User.deleteMany({ email });

  // ❌ bcrypt.hash vendam
  await User.create({
    email,
    password, // 👈 plain password
    role: "vendor",
  });

  console.log("Vendor created");
  console.log("Email:", email);
  console.log("Password:", password);

  process.exit();
};

run();
