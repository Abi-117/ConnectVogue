import Sidebar from "./Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../../utils/auth";

const AdminLayout = () => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
