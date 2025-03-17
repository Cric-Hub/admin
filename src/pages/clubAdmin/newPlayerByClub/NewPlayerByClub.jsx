import "./newPlayerByClub.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/buttons/Button";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const NewPlayerByClub = ({ inputs, title, optionalInputs }) => {
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [file, setFile] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [info, setInfo] = useState({});
  const { user } = useContext(AuthContext);
  const [clubName, setClubName] = useState(""); // State to store the club name
  const showToast = useToast();

  // Fetch the club details using the club ID from the user
  const { data: clubData, loading: clubLoading, error: clubError } = useFetch(
    user?.club ? `http://localhost:8000/api/clubs/${user.club}` : ""
  );

  useEffect(() => {
    if (clubData) {
      setClubName(clubData.name); // Set the club name when data is fetched
    }
  }, [clubData]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields((prev) => !prev); // Toggle visibility
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!info.name || !info.role) {
      showToast("Please complete all required fields!", "warn");
      return;
    }

    setButtonLoading(true);

    // Upload image to Cloudinary if a file is selected
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
        showToast("Image upload failed!", "error");
        return;
      }
    }

    // Create the player object
    const player = {
      ...info,
      img: imageUrl,
      club: user.club, // Use the club ID from the logged-in user
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

    try {
      // Send the player data to the backend
      await axios.post("http://localhost:8000/api/players", player, {
        withCredentials: true,
      });
      showToast("Player created successfully!", "success");
    } catch (err) {
      console.error("Error creating player:", err);
      showToast("Failed to create player. Please try again.", "error");
    } finally {
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      name={input.label.toLowerCase()}
                      onChange={handleChange}
                      value={info[input.label.toLowerCase()] || ""}
                    >
                      <option value="" disabled>
                        Select {input.label}
                      </option>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                      name={input.label.toLowerCase()}
                      value={info[input.label.toLowerCase()] || ""}
                      id={input.id}
                    />
                  )}
                </div>
              ))}

              {/* Display the club name */}
              <div className="formInput">
                <label>Club</label>
                <input
                  type="text"
                  value={clubName || "Loading..."}
                  disabled
                />
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

export default NewPlayerByClub;