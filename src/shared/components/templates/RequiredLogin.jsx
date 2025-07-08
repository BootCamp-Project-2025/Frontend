import { Button } from "../atoms/Button";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

export default function RequiredLogin() {
  const { handleLogin, handleSignUp } = useAuth();
  return (
    <div className="flex items-center flex-col justify-center bg-white px-6 py-12 gap-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Sign in to continue your learning experience
      </h3>

      <Button onClick={handleLogin}>Sign In</Button>

      <div>
        Don&apos;t have an account?{" "}
        <Button onClick={handleSignUp} variant="flat">
          Sign up
        </Button>
      </div>
    </div>
  );
}

RequiredLogin.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
};
