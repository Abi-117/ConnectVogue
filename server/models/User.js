import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["admin", "vendor"], required: true },
  isApproved: { type: Boolean, default: false },
});


// Pre-save hook: hash password & approve admin
userSchema.pre("save", async function () {
  // Hash password if modified or new
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Automatically approve admin
  if (this.role === "admin") {
    this.isApproved = true;
  }
});

export default mongoose.model("User", userSchema);
