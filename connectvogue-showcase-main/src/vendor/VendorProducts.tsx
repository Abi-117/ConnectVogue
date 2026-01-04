import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  status: "pending" | "approved" | "rejected";
}

const VendorProducts = () => {
  const token = localStorage.getItem("vendorToken");
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  if (!token) return <Navigate to="/vendor/login" />;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/vendor",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await res.json();
        if (res.ok) setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <button
          onClick={() => navigate("/vendor/add-product")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Products */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products added yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow p-4"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-gray-600">₹{p.price}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded text-sm ${p.status === "approved"
                  ? "bg-green-200 text-green-800"
                  : p.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                  }`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
