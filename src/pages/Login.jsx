/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
//import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(ACCESS_TOKEN);
    const now = Date.now() / 1000;

    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode(accessToken); //decode the access token
      const decodedRefreshToken = jwtDecode(refreshToken); //decode the refresh token
      const accessTokenExpiration = decodedAccessToken.exp; // get access token expiration
      const refreshTokenExpiration = decodedRefreshToken.exp; // get refresh token expiration
      if (accessTokenExpiration > now && refreshTokenExpiration > now) {
        console.log("token available and not expired");
        navigate("/");
      }
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length > 0;

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!isValidPassword) {
      alert("Please enter your password.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(true);
    if (!validateInputs()) return; // Validate inputs before submission
    setLoading(true);

    try {
      const response = await api.post("/api/token/", { email, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h1 className="text-center mb-4">Login</h1>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="input-field"
                  value={email}
                  id="inputEmail"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="input-field"
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
                  className="btn action-button"
                  onClick={handleSubmit}
                >
                  {loading ? <Spinner size={"sm"} /> : "Sign in"}
                </button>
              </div>
              <div className="text-center mt-3">
                <Link to="/password-reset-request">Forgot password?</Link> Don't
                have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
