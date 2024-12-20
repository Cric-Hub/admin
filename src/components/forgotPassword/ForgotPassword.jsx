import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css'; // Importing the CSS file

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Setting default axios configuration
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending the email to backend for the password reset process
    axios
      .post('http://localhost:8000/api/auth/forgot-password', { email })
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/login'); // Redirect to login page on success
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit" onClick={handleSubmit}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
