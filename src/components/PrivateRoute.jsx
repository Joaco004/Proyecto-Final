import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

function PrivateRoute({ children, redirectTo = "/login", replace = true }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectTo} replace={replace} state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
export { PrivateRoute };
