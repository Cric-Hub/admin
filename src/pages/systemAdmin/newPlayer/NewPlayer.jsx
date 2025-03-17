import "./newPlayer.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/buttons/Button";

const NewPlayer = ({ inputs, title, optionalInputs }) => {
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [file, setFile] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [clubID, setClubID] = useState(undefined);
  const {data, loading, error} = useFetch("http://localhost:8000/api/clubs");
  const showToast = useToast();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields((prev) => !prev); // Toggle visibility
  };

const handleClick = async (e) => {
  e.preventDefault();

  if (!clubID) {
    showToast("Please select a club before submitting!", "warn");
    return;
  }
  setButtonLoading(true);

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload");

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/hashanthapramod/image/upload",
      data
    );
    const { url } = uploadRes.data;

    const player = {
      ...info,
      img: url,
      club: clubID,
      batting: {
          matches: info.battingMatches || 0,
          innings: info.battingInnings || 0,
          runs: info.battingRuns || 0,
          ballsFaced: info.battingBallsFaced || 0,
          highestScore: info.battingHighestScore || 0,
          notOuts: info.battingNotOuts || 0,
        },
        bowling: {
          matches: info.bowlingMatches || 0,
          innings: info.bowlingInnings || 0,
          oversBowled: info.bowlingOversBowled || 0,
          ballsBowled: info.bowlingBallsBowled || 0,
          runsConceded: info.bowlingRunsConceded || 0,
          wickets: info.bowlingWickets || 0,
        },
        fielding: {
          matches: info.fieldingMatches || 0,
          catches: info.fieldingCatches || 0,
          runOuts: info.fieldingRunOuts || 0,
          stumpings: info.fieldingStumpings || 0,
        },
    };

    await axios.post("http://localhost:8000/api/players", player,{ withCredentials: true });
    showToast("Player created successfully!!", "success");
  } catch (err) {
    console.log(err);
    alert("Something went wrong while creating player!");
  }finally {
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
                  {input.type === "select" ?(
                    <select
                      name={input.label.toLowerCase()}
                      onChange={handleChange}
                      value={info[input.label.toLowerCase()] || ""}
                    >
                      <option value="" disabled>Select {input.label}</option>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ):(
                  <input type={input.type} 
                  placeholder={input.placeholder} 
                  onChange={handleChange}
                  name={input.label.toLowerCase()} 
                  value={info[input.label.toLowerCase()] || ""}
                  id={input.id}/>)}
                </div>
              ))}
              <div className="formInput">
                  <label>Select Club</label>
                  <select id="clubID" onChange={(e) => setClubID(e.target.value)} value={clubID || ""}>
                    <option value="" disabled>
                      Select a Club
                    </option>
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
                 {/* Toggle button for optional fields */}
              <button
                type="button"
                onClick={toggleOptionalFields}
                className="toggleButton"
              >
                {showOptionalFields ? "Hide Optional Fields" : "Show Optional Fields"}
              </button>

              {showOptionalFields &&
                optionalInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                      name={input.name}
                      value={info[input.name] || ""}
                      id={input.id}
                    />
                  </div>
                ))}
              <Button
                loading={buttonLoading}        
                text="Create"          
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

export default NewPlayer;
