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
  image?: string;
}

/* ✅ FIX: slug-based sizes */
const CATEGORY_SIZES: Record<string, string[]> = {
  "mens-fashion": ["XS", "S", "M", "L", "XL", "XXL"],
  "womens-fashion": ["XS", "S", "M", "L", "XL"],
  footwear: ["6", "7", "8", "9", "10", "11"],
  sportswear: ["S", "M", "L", "XL"],
  electronics: ["64GB", "128GB", "256GB", "512GB"],
  accessories: ["One Size"],
  "seasonal-gifts": ["Small", "Medium", "Large"],
  "home-lifestyle": ["Small", "Medium", "Large", "XL"],
};

export default function AdminProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState<Product>({
    name: "",
    price: 0,
    originalPrice: undefined,
    category: "",
    sizes: [],
    colors: [],
    image: "",
  });

  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  /* Fetch categories */
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  /* ✅ FIXED sizes logic */
  const sizesForCategory =
    CATEGORY_SIZES[productData.category] || [];

  const toggleSize = (size: string) => {
    setProductData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    if (!colorName.trim()) return;

    setProductData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: colorName, hex: colorHex }],
    }));

    setColorName("");
    setColorHex("#000000");
  };

  const removeColor = (index: number) => {
    setProductData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = async () => {
    if (
      !productData.name.trim() ||
      productData.price <= 0 ||
      !productData.category
    ) {
      alert("⚠️ Name, valid price & category required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed");

      alert("✅ Product added successfully");

      setProductData({
        name: "",
        price: 0,
        originalPrice: undefined,
        category: "",
        sizes: [],
        colors: [],
        image: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Admin – Add Product</h1>

      <div className="bg-white border rounded-xl p-6 space-y-6 shadow">
        {/* Name */}
        <input
          placeholder="Product Name"
          className="border p-2 rounded w-full"
          value={productData.name}
          onChange={e =>
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
            onChange={e =>
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
            value={productData.originalPrice ?? ""}
            onChange={e =>
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
          onChange={e =>
            setProductData({
              ...productData,
              category: e.target.value,
              sizes: [],
            })
          }
        >
          <option value="">Select Category</option>
          {categories.map(c => (
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
              {sizesForCategory.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    productData.sizes.includes(size)
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
              onChange={e => setColorName(e.target.value)}
            />
            <input
              type="color"
              value={colorHex}
              onChange={e => setColorHex(e.target.value)}
            />
            <Button type="button" onClick={addColor}>
              Add
            </Button>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {productData.colors.map((c, i) => (
              <span
                key={i}
                onClick={() => removeColor(i)}
                className="px-3 py-1 rounded-full border text-sm cursor-pointer"
                style={{ color: c.hex, borderColor: c.hex }}
                title="Click to remove"
              >
                {c.name} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <input
          placeholder="Image URL"
          className="border p-2 rounded w-full"
          value={productData.image || ""}
          onChange={e =>
            setProductData({ ...productData, image: e.target.value })
          }
        />

        {productData.image?.startsWith("http") && (
          <img
            src={productData.image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        {/* Submit */}
        <Button className="w-full" onClick={handleAddProduct} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
