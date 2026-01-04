"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Color {
  name: string;
  hex: string;
}

interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  category: string; // category slug
  brand?: string;
  description?: string;
  sizes: string[];
  colors: Color[];
  image?: string; // URL
}

const CATEGORY_SIZES: Record<string, string[]> = {
  "Men's Fashion": ["XS", "S", "M", "L", "XL", "XXL"],
  "Women's Fashion": ["XS", "S", "M", "L", "XL"],
  Footwear: ["6", "7", "8", "9", "10", "11"],
  Sportswear: ["S", "M", "L", "XL"],
  Electronics: ["64GB", "128GB", "256GB", "512GB"],
  Accessories: ["One Size"],
  "Seasonal Gifts": ["Small", "Medium", "Large"],
  "Home & Lifestyle": ["Small", "Medium", "Large", "XL"],
};

export default function VendorAddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productData, setProductData] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    sizes: [],
    colors: [],
    image: "",
  });

  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");
  const [loading, setLoading] = useState(false);

  /* Fetch categories */
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const selectedCategory = categories.find(
    (c) => c.slug === productData.category
  );

  const sizesForCategory =
    (selectedCategory && CATEGORY_SIZES[selectedCategory.name]) || [];

  const toggleSize = (size: string) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    if (!colorName) return;

    setProductData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: colorName, hex: colorHex }],
    }));

    setColorName("");
    setColorHex("#000000");
  };

  const handleAddProduct = async () => {
    try {
      if (!productData.name || !productData.price || !productData.category) {
        alert("⚠️ Name, Price & Category are required");
        return;
      }

      setLoading(true);

      console.log(localStorage.getItem("vendorToken"));


      const res = await fetch(
        "http://localhost:5000/api/products/vendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("vendorToken"),
          },
          body: JSON.stringify(productData),
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

      alert("✅ Product added successfully");

      setProductData({
        name: "",
        price: 0,
        category: "",
        sizes: [],
        colors: [],
        image: "",
      });
    } catch (err) {
      alert("❌ Error adding product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Admin – Products</h1>

      <div className="bg-white border rounded-xl p-6 space-y-6 shadow">
        {/* Product Name */}
        <input
          placeholder="Product Name"
          className="border p-2 rounded w-full"
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
        />

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={productData.price}
            onChange={(e) =>
              setProductData({
                ...productData,
                price: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Original Price"
            className="border p-2 rounded"
            value={productData.originalPrice || ""}
            onChange={(e) =>
              setProductData({
                ...productData,
                originalPrice: Number(e.target.value),
              })
            }
          />
        </div>

        {/* Category */}
        <select
          className="border p-2 rounded w-full"
          value={productData.category}
          onChange={(e) =>
            setProductData({ ...productData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Sizes */}
        {sizesForCategory.length > 0 && (
          <div>
            <p className="font-medium mb-2">Sizes</p>
            <div className="flex gap-2 flex-wrap">
              {sizesForCategory.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded-full border text-sm ${productData.sizes.includes(size)
                    ? "bg-black text-white"
                    : ""
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        <div>
          <p className="font-medium mb-2">Colors</p>
          <div className="flex gap-2">
            <input
              placeholder="Color name"
              className="border p-2 rounded flex-1"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
            <input
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
            />
            <Button type="button" onClick={addColor}>
              Add
            </Button>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {productData.colors.map((c, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border text-sm"
                style={{ color: c.hex, borderColor: c.hex }}
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded w-full"
          value={productData.image || ""}
          onChange={(e) =>
            setProductData({ ...productData, image: e.target.value })
          }
        />

        {productData.image && (
          <img
            src={productData.image}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}

        <Button
          className="w-full"
          disabled={loading}
          onClick={handleAddProduct}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
