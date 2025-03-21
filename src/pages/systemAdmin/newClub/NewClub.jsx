import "./newClub.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import Button from "../../../components/buttons/Button";

const NewClub = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
    const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleClick = async (e) => {
    setButtonLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/hashanthapramod/image/upload",
        data);
        const { url } = uploadRes.data;

        const newClub = {
          ...info,
          image: url,
        };

        await axios.post("http://localhost:8000/api/clubs", newClub, { withCredentials: true });
    } catch (err) {
      console.log(err);
    } finally {
      setButtonLoading(false);
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
                  <input 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={handleChange}
                    name={input.label.toLowerCase()} 
                    id={input.id}/>
                </div>
              ))}
              <Button
                loading={buttonLoading}        
                text="Create club"          
                onClick={handleClick}   
                loadingText="Creating..."     
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClub;
