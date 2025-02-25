import "./newNews.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../../../context/ToastContext";
import { newsInputs } from "../../../formSource";
import Button from "../../../components/buttons/Button";

const NewNews = ({ title }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const [tags, setTags] = useState("");
  const showToast = useToast();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    setButtonLoading(true);
    e.preventDefault();

    const data = new FormData();
    if (file) {
      data.append("file", file);
      data.append("upload_preset", "upload");
    }

    try {
      let imageUrl = "";
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/hashanthapramod/image/upload",
          data
        );
        imageUrl = uploadRes.data.url;
      }

      const newNews = {
        ...info,
        image: imageUrl,
        tags: tags.split(",").map((tag) => tag.trim()), // Split tags by commas
      };

      await axios.post("http://localhost:8000/api/news", newNews,{ withCredentials: true });
      showToast("News created successfully!!", "success");

      // Clear the form fields after submission
      setInfo({});
      setTags("");
      setFile(null);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong while creating News!", "error");
    }finally {
      setButtonLoading(false);
    }
  };

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
              {newsInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    name={input.label.toLowerCase()}
                    id={input.id}
                    value={info[input.label.toLowerCase()] || ""}
                  />
                </div>
              ))}
              <Button
                loading={buttonLoading}        
                text="Publish News"          
                onClick={handleClick}   
                loadingText="Publishing..."     
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNews;
