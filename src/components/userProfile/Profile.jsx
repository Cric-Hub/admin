import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext); // Get dispatch from context
  

  return (
    <div>
      <h2 className="profile-header">Public Profile</h2>
      <div className="profile-pic-container">
        {user.img && <img src={user.img} alt="" className="profile-pic" />}
      </div>
      <div className="profile-form" >
        <div className="form-group">
          <label>{user.username}</label>
          <label>lastName</label>
        </div>
        <label>{user.email}</label>
      </div>
    </div>
  );
};

export default Profile;
