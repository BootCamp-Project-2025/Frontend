import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <span>Loading...</span>
    </div>
  );
}

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, roles, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/required-login" replace />;
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/become-teacher" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
};
