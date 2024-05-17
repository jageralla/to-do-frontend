/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//import "./App.css";
import Test from "./pages/Test";
import Header from "./components/Header";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useParams } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/"); // Split the path into segments
    const tokenFromUrl = segments[segments.length - 2]; // Assuming the token is the last segment/ Assuming the token is the last segment
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/password-reset-request"
          element={<PasswordResetRequestPage />}
        />
        <Route
          path="/password-reset-confirm/:token"
          element={<PasswordResetConfirmPage token={token} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
