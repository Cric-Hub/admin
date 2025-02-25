import React, { useState } from "react";
import "./userProfile.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [menuActive, setMenuActive] = useState(false);
  const {user, dispatch} = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  }

  return (
    <div className="account">
      <div className="profile" onClick={toggleMenu}>
        {user.img && <img src={user.img} alt="" className="avatar" />}
      </div>

      <div className={`menu ${menuActive ? "active" : ""}`}>
        <h3>{user.username}</h3>
        <p>{user.isAdmin ? "System Admin" : "Club Admin"}</p>
        <ul>
          <Link to="/profile" style={{ textDecoration: "none" }} >
          <li>
            <i className="fa-regular fa-user"></i>
            <label>Profile</label>
          </li>
          </Link>
          <Link to="/settings" style={{ textDecoration: "none" }}>
          <li>
            <i className="fa-solid fa-gear"></i>
            <label>Settings</label>
          </li>
          </Link>
          <Link to="/#" style={{ textDecoration: "none" }} onClick={handleLogout}>
          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            <label>Logout</label>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
