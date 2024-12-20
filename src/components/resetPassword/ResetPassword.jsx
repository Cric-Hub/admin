import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './ResetPassword.css'; // Import the CSS file

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        axios.post(`http://localhost:8000/api/auth/reset-password/${id}/${token}`, { password })
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate("/login");
                }
            }).catch((err) => console.log(err));
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            name="confirmPassword"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn-submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
