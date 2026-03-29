import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but wrong role
    // Redirect to their own dashboard or login
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'manager') return <Navigate to="/manager" replace />;
    if (user.role === 'employee') return <Navigate to="/employee" replace />;
    if (user.role === 'finance') return <Navigate to="/finance" replace />;
    if (user.role === 'director') return <Navigate to="/director" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
