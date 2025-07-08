import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import RequiredLogin from "../components/templates/RequiredLogin";
import BecomeTeacherPrompt from "../components/templates/BecomeTeacher";

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
    return <RequiredLogin />;
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    return <BecomeTeacherPrompt />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
};
