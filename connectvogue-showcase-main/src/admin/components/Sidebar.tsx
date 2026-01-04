import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard">Dashboard</Link>

        <Link to="/admin/navbar">Navigation</Link>
        <Link to="/admin/hero">Hero Slides</Link>

        <Link to="/admin/categories">Categories</Link>
        {/* <Link to="/admin/products">Products</Link> */}
        <Link to="/admin/productdetails">Product Details</Link>

        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/contacts">Contact Messages</Link>
        <Link to="/admin/company-contact">Company Contact</Link>


        <Link to="/admin/about">About</Link>
        <Link to="/admin/features">Feature Management</Link>
        <Link to="/admin/footer">Footer</Link>
        <Link to="/admin/pending-products">Pending Products</Link>
        {/* <Link to="/admin/create-vendor">Create Vendor</Link> */}
        {/* <Link to="/admin/vendor-approvals">Vendor Approvals</Link> */}


        <button onClick={logout} className="text-left mt-6 text-red-400">
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
