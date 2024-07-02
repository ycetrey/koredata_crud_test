import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

interface PrivateRouteProps {
  Component: React.ComponentType;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const { auth } = useAuth();
  return auth?.usuario ? <Component /> : <Navigate to="/login" />;
};
