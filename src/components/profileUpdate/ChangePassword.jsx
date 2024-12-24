import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./changePassword.css";

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/auth/change-password/${user._id}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },{
          withCredentials: true,
        }
      );
      setSuccess(response.data.message);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="change-password-container">
      <form className="change-password-form" onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
