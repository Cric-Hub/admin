import React, { useState } from "react";
import "./userProfile.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfile = () => {
  const [menuActive, setMenuActive] = useState(false);
  const {user} = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="account">
      <div className="profile" onClick={toggleMenu}>
        {user.img && <img src={user.img} alt="" className="avatar" />}
      </div>

      <div className={`menu ${menuActive ? "active" : ""}`}>
        <h3>{user.username}</h3>
        <p>{user.isAdmin ? "System Admin" : "Club Admin"}</p>
        <ul>
          <li>
            <i className="fa-regular fa-user"></i>
            <a href="#">Profile</a>
          </li>
          {/* <li>
            <i className="fa-solid fa-pen-to-square"></i>
            <a href="#">Edit</a>
          </li>
          <li>
            <i className="fa-regular fa-envelope"></i>
            <a href="#">Message</a>
          </li> */}
          <li>
            <i className="fa-solid fa-gear"></i>
            <a href="#">Settings</a>
          </li>
          {/* <li>
            <i className="fa-solid fa-circle-question"></i>
            <a href="#">Help</a>
          </li> */}
          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
