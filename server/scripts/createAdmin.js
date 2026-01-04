import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI undefined");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected for admin creation");

    const email = "admin@gmail.com";
    const password = "Admin@123";

    // Delete old admin if exists
    await User.deleteMany({ email });

    // Create admin (pre-save hook hashes password and sets isApproved)
    await User.create({
      email,
      password,
      role: "admin",
    });

    console.log("Admin CREATED successfully!");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

run();
