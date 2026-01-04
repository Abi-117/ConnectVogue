"use client";
import { useEffect, useState } from "react";

/* 🔥 Slug generator */
const makeSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function AdminCategory() {
  const [categories, setCategories] = useState<any[]>([]);

  /* Fetch categories */
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      });
  }, []);

  /* Handle field change */
  const handleChange = (i: number, key: string, value: any) => {
    const updated = [...categories];
    updated[i][key] = value;

    /* 🔥 Auto slug when name changes */
    if (key === "name" && !updated[i].slugTouched) {
      updated[i].slug = makeSlug(value);
    }

    setCategories(updated);
  };

  /* Slug manual edit */
  const handleSlugChange = (i: number, value: string) => {
    const updated = [...categories];
    updated[i].slug = makeSlug(value);
    updated[i].slugTouched = true;
    setCategories(updated);
  };

  /* Add new category */
  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: "",
        slug: "",
        image: "",
        featured: false,
        order: categories.length + 1,
      },
    ]);
  };

  /* Delete category */
  const deleteCategory = (index: number) => {
    if (!window.confirm("Delete this category?")) return;
    setCategories(categories.filter((_, i) => i !== index));
  };

  /* Save categories */
  const saveCategories = async () => {
    await fetch("http://localhost:5000/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categories),
    });
    alert("✅ Categories saved successfully");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Admin – Categories</h1>

      {categories.map((cat, i) => (
        <div
          key={i}
          className="border rounded-xl p-5 space-y-4 relative bg-white"
        >
          {/* Delete */}
          <button
            onClick={() => deleteCategory(i)}
            className="absolute top-4 right-4 text-red-600 text-sm"
          >
            ❌ Delete
          </button>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              value={cat.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Men Wear"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug (auto)
            </label>
            <input
              value={cat.slug}
              onChange={(e) => handleSlugChange(i, e.target.value)}
              className="border p-2 w-full rounded bg-gray-50"
              placeholder="men-wear"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: {cat.slug || "slug"}
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              value={cat.image}
              onChange={(e) => handleChange(i, "image", e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Options */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={cat.featured}
                onChange={(e) =>
                  handleChange(i, "featured", e.target.checked)
                }
              />
              Featured
            </label>

            <input
              type="number"
              value={cat.order}
              onChange={(e) =>
                handleChange(i, "order", Number(e.target.value))
              }
              className="border p-2 w-24 rounded"
              placeholder="Order"
            />
          </div>
        </div>
      ))}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={addCategory}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>

        <button
          onClick={saveCategories}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          💾 Save Categories
        </button>
      </div>
    </div>
  );
}
