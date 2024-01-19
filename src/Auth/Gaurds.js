import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Layout from "../Layout";
import { useEffect } from "react";

export function PrivateOutlet() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/challenges");
    }
  }, []);
  return isAuth ? <Layout /> : <Navigate to="/login" />;
}

export function PrivateRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
}
