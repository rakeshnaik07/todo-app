import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");

      if (!username || !email || !password) {
        setError("All fields are required");
        return;
      }

      setLoading(true);

      await axios.post(
        "http://localhost:3000/users/register",
        {
          username,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card auth-card">
        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Start organizing your tasks today.
        </p>

        <div className="form-group">
          <label>Username</label>

          <input
            className="input"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            className="input"
            type="email"
            placeholder="Enter email"
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
            placeholder="Create password"
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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;