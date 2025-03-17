import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./accountSettings.css";
import Button from "../buttons/Button";

const AccountSettings = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { user, dispatch } = useContext(AuthContext); // Get dispatch from context
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    setButtonLoading(true);
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let imageUrl = user?.img || null;

    // If there's a new image, upload it to Cloudinary
    if (formData.img) {
      const data = new FormData();
      data.append("file", formData.img);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/hashanthapramod/image/upload",
          data
        );
        imageUrl = uploadRes.data.url;
      } catch (err) {
        console.error(err);
        alert("Error uploading image. Please try again.");
        return;
      }
    }

    //updated user data
    const updatedUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      img: imageUrl,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user._id}`,
        updatedUser,{ withCredentials: true }
      );
      dispatch({ type: "UPDATE_USER", payload: response.data }); // Dispatch the updated user
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }finally{
      setButtonLoading(false);
    }
  };

  return (
    <div>
      <h2 className="profile-header">Public Profile</h2>
      <div className="profile-pic-container">
        <img
          src={
            formData.img
              ? URL.createObjectURL(formData.img)
              : user?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.png"
          }
          alt="profile"
          className="profile-pic"
        />
        <div className="profile-pic-buttons">
          <label htmlFor="change-picture" className="btn">
            Change picture
          </label>
          <input
            type="file"
            id="change-picture"
            name="img"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => setFormData({ ...formData, img: null })}
          >
            Delete picture
          </button>
        </div>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="First Name"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={user?.lastName || ""}
            readOnly
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button
                loading={buttonLoading}        
                text="Update"          
                onClick={handleSubmit}   
                loadingText="Updating..." 
                className="btn btn-submit"    
              />
      </form>
    </div>
  );
};

export default AccountSettings;
