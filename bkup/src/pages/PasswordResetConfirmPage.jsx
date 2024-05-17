/* eslint-disable react/prop-types */
// PasswordResetConfirmForm.js

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordResetConfirmPage = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/password-reset-confirm/", {
        token,
        new_password: newPassword,
      });
      setMessage(
        "Password has been reset successfully. Redirecting to Login Page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Password Reset Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordResetConfirmPage;
