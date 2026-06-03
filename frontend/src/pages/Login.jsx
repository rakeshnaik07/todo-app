import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("All fields are required");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card auth-card">

        <h1 className="auth-title">
          TaskFlow
        </h1>

        <p className="auth-subtitle">
          Welcome back. Sign in to continue.
        </p>

        <div className="form-group">
          <label>Email</label>

          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <button
          className="btn btn-primary full-width mt-3"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;