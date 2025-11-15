import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />; // unauthorized → login page
  }

  return children; // authorized → page access allowed
};

export default ProtectedRoute;
