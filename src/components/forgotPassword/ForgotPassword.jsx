import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Setting default axios configuration
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(''); // Reset error message

    try {
      const res = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
      console.log("Response from server:", res);
      if (res.data.Status === 'Success') {
        alert(res.data.Message);
        navigate('/login');
      } else {
        setError(res.data.Message || 'Failed to send reset link.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error("Error:", err);
    } finally {
      setLoading(false); // Reset loading state
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
