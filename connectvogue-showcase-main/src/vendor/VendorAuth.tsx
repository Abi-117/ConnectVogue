import { Navigate } from "react-router-dom";

const VendorAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("vendorToken");

  if (!token) {
    return <Navigate to="/vendor/login" replace />;
  }

  return children;
};

export default VendorAuth;
