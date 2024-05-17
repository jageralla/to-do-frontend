// PasswordResetRequestForm.js
import { useState } from "react";
import axios from "axios";

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to validate email using regular expression
  const isEmailValid = (email) => {
    // Regular expression pattern for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!isEmailValid(email)) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/password-reset/", { email });
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage("The email you entered is not associated with any account.");
    }

    setLoading(false);
  };

  return (
    <div className="password-reset-container">
      <h2>Password Reset Request</h2>
      <div className="task-field">
        <input
          className="input-field"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="task-entry-action"
          disabled={email === "" ? true : false}
          onClick={handleSubmit}
        >
          Reset
        </button>
      </div>
      <p className="mt-3 text-danger">{message}</p>
    </div>
  );
};

export default PasswordResetRequestPage;
