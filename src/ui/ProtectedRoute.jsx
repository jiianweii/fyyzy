import { useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import Loader from "./Loader";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <Loader />;

  return children;
}
