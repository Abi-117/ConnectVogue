import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "server/.env" });

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const email = "test_pending_vendor@example.com";
        await User.deleteMany({ email });

        // 1. Create Vendor (Unapproved by default)
        const vendor = await User.create({
            email,
            password: "password123",
            role: "vendor"
        });

        console.log(`Created vendor: ${vendor.email}, Approved: ${vendor.isApproved}`);

        if (vendor.isApproved !== false) {
            throw new Error("Vendor should be unapproved by default!");
        }

        // 2. Simulate Admin finding unapproved vendors
        const pending = await User.find({ role: "vendor", isApproved: false });
        const found = pending.find(v => v.email === email);

        if (!found) {
            throw new Error("Created vendor not found in pending list!");
        }
        console.log("Vendor found in pending list");

        // 3. Simulate Approval
        found.isApproved = true;
        await found.save();

        const approvedVendor = await User.findById(vendor._id);
        if (approvedVendor.isApproved !== true) {
            throw new Error("Vendor failed to be approved!");
        }

        console.log("Vendor successfully approved!");
        console.log("✅ Verification Passed");

    } catch (err) {
        console.error("❌ Verification Failed:", err);
    } finally {
        await mongoose.connection.close();
    }
};

verify();
