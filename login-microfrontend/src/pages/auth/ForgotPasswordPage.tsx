import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import SocialLogin from "../../components/lastLogin/SocialLogin";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout position="left">
      <h2>Forgot Password</h2>

      <form className="login-form">
        <input type="email" placeholder="Username o Email" required />
        <button type="submit" className="login-btn">
          Next
        </button>
        <div className="forgot-link">
          <span onClick={() => navigate("/login")}>Back to Login?</span>
        </div>
      </form>

      <SocialLogin />
    </AuthLayout>
  );
}
