"use client";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  status: string;
}

export default function AdminPendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  // 🔹 Fetch pending products
  const fetchPendingProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("⚠️ Admin not logged in. Please log in first.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/products?status=pending", {
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch pending products:", err);
      alert("❌ Failed to fetch pending products. Check console for details.");
    }
  };

  useEffect(() => {
    fetchPendingProducts();

    // Optional: auto-remove approved products from list
    const handleProductApproved = (e: any) => {
      setProducts((prev) => prev.filter((p) => p._id !== e.detail._id));
      setApprovedIds((prev) => [...prev, e.detail._id]);
    };

    window.addEventListener("product-approved", handleProductApproved);
    return () => window.removeEventListener("product-approved", handleProductApproved);
  }, []);

  // 🔹 Approve product
  const approveProduct = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return alert("⚠️ Admin not logged in.");

      setLoadingIds((prev) => [...prev, id]);

      const res = await fetch(`http://localhost:5000/api/products/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const updatedProduct = await res.json();

      setApprovedIds((prev) => [...prev, updatedProduct._id]);
      setLoadingIds((prev) => prev.filter((i) => i !== id));
      setProducts((prev) => prev.filter((p) => p._id !== updatedProduct._id));

      // dispatch event for other components
      window.dispatchEvent(new CustomEvent("product-approved", { detail: updatedProduct }));

      alert(`✅ Product "${updatedProduct.name}" Approved`);
    } catch (err) {
      console.error("Failed to approve product:", err);
      setLoadingIds((prev) => prev.filter((i) => i !== id));
      alert("❌ Failed to approve product. Check console for details.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pending Vendor Products</h1>

      {products.length === 0 && <p>No pending products 🎉</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-xl p-4 shadow bg-white">
            {p.image && (
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
            )}
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-gray-600">₹{p.price}</p>
            <p className="text-sm text-gray-500 mb-3">Category: {p.category}</p>

            <button
              disabled={loadingIds.includes(p._id) || approvedIds.includes(p._id)}
              onClick={() => approveProduct(p._id)}
              className={`w-full py-2 rounded text-white ${
                approvedIds.includes(p._id) ? "bg-green-600" : "bg-black hover:bg-gray-800"
              }`}
            >
              {approvedIds.includes(p._id)
                ? "Approved ✅"
                : loadingIds.includes(p._id)
                ? "Approving..."
                : "Approve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
