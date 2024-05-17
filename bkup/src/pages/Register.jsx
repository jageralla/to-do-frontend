/* eslint-disable react-hooks/exhaustive-deps */
//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import Spinner from "../components/Spinner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      navigate("/");
    }
  }, []);

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z0-9 ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidname = nameRegex.test(name);
    const isValidPassword = password.length >= 6;
    const isValidEmail = emailRegex.test(email);

    if (!isValidname) {
      alert(
        "Name must be at least 3 characters long and contain only letters and numbers."
      );
      return false;
    }

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!isValidPassword) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return; // Validate inputs before submission
    setLoading(true);

    try {
      const response = await api.post("/api/user/register/", {
        name,
        password,
        email,
      });
      console.log(response.data);
      alert("Registered successfully. You will be redirected to Login page.");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      alert("Email already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center text-black mb-4">Register</h2>
            <form>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  {loading ? <Spinner size={"sm"} /> : "Submit"}
                </button>
              </div>
              <div className="text-center mt-3">
                <p className="text-black">
                  Already registered? <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
