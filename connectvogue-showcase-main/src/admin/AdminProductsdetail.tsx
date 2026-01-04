"use client";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/productdetails")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:5000/api/productdetails/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin – Products</h1>

      {products.map(p => (
        <div key={p._id} className="border p-4 mb-4 flex justify-between">
          <div>
            <p className="font-semibold">{p.name}</p>
            <p>₹{p.price}</p>
          </div>
          <button
            onClick={() => deleteProduct(p._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
