import "./newPlayerByClub.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";

const NewPlayerByClub = ({ inputs, title }) => {
const {user} = useContext(AuthContext);
const [info, setInfo] = useState({});
const [file, setFile] = useState("");
const [clubID, setClubID] = useState(undefined);
const {data, loading, error} = useFetch("http://localhost:8000/api/clubs");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
const handleClick = async (e) => {
  e.preventDefault();
  if (!info.name || !clubID) {
    alert("Please complete all fields!");
    return;
  }

  let imageUrl = "";
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/hashanthapramod/image/upload",
        formData
      );
      imageUrl = uploadRes.data.url;
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Image upload failed!");
      return;
    }
  }

  const player = {
    name: info.name,
    club: clubID,
    img: imageUrl,
  };

  try {
    await axios.post("http://localhost:8000/api/players", player);
    alert("Player created successfully!");
  } catch (err) {
    console.error("Error creating player:", err);
    alert("Failed to create player. Please try again.");
  }
};

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} 
                  onChange={handleChange}
                  name={input.label.toLowerCase()} 
                  id={input.id}
                  placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                  <label>Select Club</label>
                  <select id="clubID" onChange={(e) => setClubID(e.target.value)} value={clubID || ""}>
                    <option value="" disabled>Select a Club</option>
                    {loading
                      ? "loading"
                      : data &&
                        data.map((club) => (
                          <option key={club._id} value={club._id}>
                            {club.name}
                          </option>
                        ))}
                  </select>
                </div>
              <button onClick={handleClick} disabled={!info.name || !clubID}>
                {loading ? "Submitting..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlayerByClub;
