import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page with return url
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return null; // Don't render children while redirecting
  }

  return <>{children}</>;
}
