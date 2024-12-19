import "./newMatch.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useToast } from "../../context/ToastContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const NewMatch = ({ inputs, title }) => {
const { user } = useContext(AuthContext); // User context
  const [info, setInfo] = useState({ overs: 0, tossChoice: "",tossWinner: "", currentInnings: "club1" });
  const [club2, setClub2] = useState("");
  const [club1Players, setClub1Players] = useState([]);
  const [club2Players, setClub2Players] = useState([]);
  const [selectedClub1Players, setSelectedClub1Players] = useState([]);
  const [selectedClub2Players, setSelectedClub2Players] = useState([]);
  const showToast = useToast();

  const { data: clubs, loading: clubsLoading } = useFetch("http://localhost:8000/api/clubs");

  // Automatically set Club 1 as the user's club
  const club1 = user.club;

  // Fetch players when clubs change
  useEffect(() => {
    const fetchPlayers = async (clubId, setPlayers) => {
      try {
        const res = await axios.get(`http://localhost:8000/api/players/by-club/${clubId}`);
        setPlayers(res.data);
      } catch (err) {
        console.error(err);
        showToast("Error fetching players", "error");
      }
    };

    if (club1) fetchPlayers(club1, setClub1Players);
    if (club2) fetchPlayers(club2, setClub2Players);
  }, [club1, club2, showToast]);

    const handleChange = (e) => {
  const { name, value } = e.target;
  setInfo((prevInfo) => ({
    ...prevInfo,
    [name]: value.trim(),  // Ensure value is a clean string
  }));
};


     const handlePlayerSelection = (e, setSelectedPlayers) => {
    const { value, checked } = e.target;
    if (checked) {
        setSelectedPlayers((prev) => [...prev, value]);
    } else {
        setSelectedPlayers((prev) => prev.filter((player) => player !== value));
    }
};

const handleClick = async (e) => {
  e.preventDefault();

  if (!club1 || !club2 || selectedClub1Players.length === 0 || selectedClub2Players.length === 0) {
    showToast("Please fill all fields and select players.", "warn");
    return;
  }

  const newMatch = {
    overs: info.overs,
    tossChoice: info.tossChoice,
    tossWinner: info.tossWinner,
    currentInnings: info.currentInnings,
    club1: {
      club: club1,
      players: selectedClub1Players,
    },
    club2: {
      club: club2,
      players: selectedClub2Players,
    },
  };

  try {
    const response = await axios.post("http://localhost:8000/api/matches", newMatch);
    console.log(response.data);  // Log server response
    showToast("Match created successfully!", "success");
  } catch (err) {
    console.error(err);
    showToast("Error creating match. Try again.", "error");
    
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
          </div>
          <div className="right">
            <form>

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
{/* Toss Winner Dropdown */}
<div className="formInput">
  <label>Select Toss Winner</label>
  <select name="tossWinner" onChange={handleChange}>
    <option value="" disabled>Select Toss Winner</option>

    {/* Match club1 ID with club data to get club name */}
    {clubs
      .filter((club) => club._id === club1)
      .map((club) => (
        <option key={club._id} value={club._id}>
          {club.name}
        </option>
      ))}

    {/* Match club2 ID with club data to get club name */}
    {clubs
      .filter((club) => club._id === club2)
      .map((club) => (
        <option key={club._id} value={club._id}>
          {club.name}
        </option>
      ))}
  </select>
</div>

{/* Current Inning Dropdown */}
<div className="formInput">
  <label>Select Current Inning</label>
  <select name="currentInning" onChange={handleChange}>
    <option value="" disabled>Select Current Inning</option>

    {/* Show Club 1 as a current inning option */}
    {club1 && (
      <option value="club1">
        {clubs.find((club) => club._id === club1)?.name}
      </option>
    )}

    {/* Show Club 2 as a current inning option */}
    {club2 && (
      <option value="club2">
        {clubs.find((club) => club._id === club2)?.name}
      </option>
    )}
  </select>
</div>


            <div className="formInput">
              <label>Toss Choice</label>
              <select name="tossChoice" onChange={handleChange}>
                <option value="" disabled>Select Toss Choice</option>
                <option value="Bat">Bat</option>
                <option value="Bowl">Bowl</option>
              </select>
            </div>
            <div className="formInput">
              <label>Select Club 2</label>
              <select value={club2} onChange={(e) => setClub2(e.target.value)}>
                <option value="" disabled>Select Club 2</option>
                {clubsLoading ? (
                  <option>Loading...</option>
                ) : (
                  clubs.filter((club) => club._id !== club1).map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))
                )}
              </select>
            </div>
                <div className="formInput">
  <label>Select Players for Club 1</label>
  <select
    multiple
    onChange={(e) =>
      handlePlayerSelection(e, setSelectedClub1Players)
    }
    value={selectedClub1Players} // Ensure the dropdown reflects selected players
  >
    {club1Players.map((player) => (
      <option key={player._id} value={player._id}>
        {player.name}
      </option>
    ))}
  </select>
</div>

<div className="formInput">
  <label>Select Players for Club 2</label>
  <select
    multiple
    onChange={(e) =>
      handlePlayerSelection(e, setSelectedClub2Players)
    }
    value={selectedClub2Players} // Ensure the dropdown reflects selected players
  >
    {club2Players.map((player) => (
      <option key={player._id} value={player._id}>
        {player.name}
      </option>
    ))}
  </select>
</div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMatch;
