import Product from "../models/Product.js";

// ✅ Vendor – add product (pending)
export const vendorCreateProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      vendor: req.user.id,
      status: "pending",
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin – approve product
export const approveProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );

  res.json(product);
};

// ✅ Public – approved products only
export const getProducts = async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  } else {
    filter.status = "approved";
  }

  const products = await Product.find(filter);
  res.json(products);
};
