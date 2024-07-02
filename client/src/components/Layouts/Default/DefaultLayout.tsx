import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.ts";

export function DefaultLayout() {
  const location = useLocation();
  const { pathname } = location;
  const { auth } = useAuth();

  if (!auth?.usuario && pathname != "/login" && pathname != "/register")
    return <Navigate to="/login" />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
