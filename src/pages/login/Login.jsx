import React from 'react';
import './login.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import cricketerLogo from '../../assets/cricketerLogo.png';
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../context/ToastContext";

const openGmail = () => {
  const recipient = 'CrickHub@gmail.com';
  const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}`;
  window.open(mailtoUrl, '_blank');
};


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const {user, loading, error, dispatch} = useContext(AuthContext);
    const showToast = useToast();
    const navigate = useNavigate();

      useEffect(() => {
    // Redirect to home page if the user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", credentials);
            if (res.data.isAdmin) {
                dispatch({type: "LOGIN_SUCCESS", payload: res.data});
                navigate("/");
                showToast("Login successful admin!", "success");
            }
            else {
                dispatch({type: "LOGIN_SUCCESS", payload: res.data});
                navigate("/");
                showToast("Login successful!", "success");
            }
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
            showToast(err.response.data.message || "Login failed!", "error");
        }
    }

    console.log(user);
  return (
    <div className='main-login-page'>
      <div className='main-image'>
        <img src={cricketerLogo} alt="Cricketer Logo" />
      </div>
      <div className='wrapper'>
        <form action="">
          <h1>Sign in</h1>
          <div className='input-box'>
            <input type="text" placeholder='username' id="username" required onChange={handleChange} className="lInput" />
            <FaUserAlt className='icon' />
          </div>
          <div className='input-box'>
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
            <FaLock className='icon' />
          </div>

          <div className='remember-forgot'>
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button disabled={loading} onClick={handleClick} className="lButton">SignIn</button>
          {loading ? "Signing in..." : ""}
          <div className='leave-note'>
            <p>You are unable to create a new account. Please contact the Administrator.
              <a onClick={openGmail}> Leave a note </a>
            </p>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login