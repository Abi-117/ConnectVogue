import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import navigationRoutes from "./routes/navigation.routes.js";
import productRoutes from "./routes/product.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import companyContactRoutes from "./routes/companyContact.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import heroRoutes from "./routes/hero.routes.js";
import featureRoutes from "./routes/feature.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productDetailRoutes from "./routes/productdetails.routes.js";
import orderRoutes from "./routes/order.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import vendorAuthRoutes from "./routes/vendorAuth.routes.js";
import adminproductRoutes from "./routes/adminProductRoutes.js";

import upload from "./middleware/upload.js"; 


// ----------------------
// Initialize dotenv & DB
// ----------------------
dotenv.config();
connectDB();

// ----------------------
// Initialize Express app
// ----------------------
const app = express();

// ----------------------
// Middleware
// ----------------------
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));


// ----------------------
// Routes
// ----------------------
app.use("/api/users", userRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/company-contact", companyContactRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/productdetails", productDetailRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/footer", footerRoutes);

app.use("/api/admin", adminAuthRoutes);
app.use("/api/vendor", vendorAuthRoutes);
app.use("/api/adminproducts", adminproductRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
