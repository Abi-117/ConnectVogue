import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  status: "pending" | "approved" | "rejected";
}

const VendorDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  if (!token) return <Navigate to="/vendor/login" />;

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/products/vendor",
        {
          headers: { Authorization: "Bearer " + token },
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const logout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor/login");
  };

  const pending = products.filter(p => p.status === "pending").length;
  const approved = products.filter(p => p.status === "approved").length;
  const rejected = products.filter(p => p.status === "rejected").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Stat title="Pending" count={pending} color="yellow" />
        <Stat title="Approved" count={approved} color="green" />
        <Stat title="Rejected" count={rejected} color="red" />
      </div>

      <button
        onClick={() => navigate("/vendor/add-product")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        ➕ Add Product
      </button>
      <button
        onClick={() => navigate("/vendor/products")}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        📦 View My Products
      </button>


      {/* Product Table */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products added yet</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b">
                <td className="p-3">{p.name}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded text-sm ${p.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : p.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
};

const Stat = ({ title, count, color }: any) => (
  <div className={`bg-${color}-100 p-4 rounded shadow`}>
    <h3 className="text-sm">{title}</h3>
    <p className="text-2xl font-bold">{count}</p>


  </div>

);

export default VendorDashboard;
