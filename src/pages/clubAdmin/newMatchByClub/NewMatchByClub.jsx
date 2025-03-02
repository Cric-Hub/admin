import "./newMatchByClub.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/buttons/Button";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const NewMatchByClub = ({ inputs, title }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [club1Players, setClub1Players] = useState([]);
  const [club2Players, setClub2Players] = useState([]);
  const [club1ID, setClub1ID] = useState(undefined);
  const [club2ID, setClub2ID] = useState(undefined);
  const [tossWinner, setTossWinner] = useState(undefined);
  const [tossChoice, setTossChoice] = useState(undefined);
  const [currentInnings, setCurrentInnings] = useState("");
  const { user } = useContext(AuthContext);
  const [clubName, setClubName] = useState("")

  const { data: clubs, loading: clubsLoading } = useFetch("http://localhost:8000/api/clubs");
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

  const fetchClubPlayers = async (clubId, setPlayers) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/players/by-club/${clubId}`, { withCredentials: true });
      setPlayers(res.data);
    } catch (err) {
      console.error("Error fetching players:", err);
      showToast("Error fetching players!", "error");
    }
  };

  const handleClub2Change = async (e) => {
    const clubId = e.target.value;
    setClub2ID(clubId);
    fetchClubPlayers(clubId, setClub2Players);
  };

  const handleTossChoiceChange = (choice) => {
    setTossChoice(choice);
    setCurrentInnings(
      tossWinner === club1ID
        ? choice === "Bat"
          ? "club1"
          : "club2"
        : choice === "Bat"
        ? "club2"
        : "club1"
    );
  };

  const handleClick = async (e) => {
    setButtonLoading(true);
    e.preventDefault();

    if (!club1ID || !club2ID || !tossWinner) {
      showToast("Please complete all fields before submitting!", "warn");
      setButtonLoading(false);
      return;
    }

    if (info.overs <= 0) {
      showToast("Overs must be a positive number!", "warn");
      setButtonLoading(false);
      return;
    }

    const newMatch = {
      ...info,
      club1: { club: club1ID, players: club1Players.map((p) => p._id) },
      club2: { club: club2ID, players: club2Players.map((p) => p._id) },
      tossWinner,
      tossChoice,
      currentInnings,
    };

    try {
      await axios.post("http://localhost:8000/api/matches", newMatch, { withCredentials: true });
      showToast("Match created successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error creating match!", "error");
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
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    name={input.label.toLowerCase()}
                    id={input.id}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Club 1 (Your Club)</label>
                <input type="text" value={clubName || "Loading..."} disabled />
              </div>

              <div className="formInput">
                <label>Select Club 2</label>
                <select id="club2" onChange={handleClub2Change} value={club2ID || ""}>
                  <option value="" disabled>
                    Select Club 2
                  </option>
                  {clubsLoading
                    ? <option>Loading clubs...</option>
                    : clubs
                        .filter((club) => club._id !== club1ID)
                        .map((club) => (
                          <option key={club._id} value={club._id}>
                            {club.name}
                          </option>
                        ))}
                </select>
              </div>

              <div className="formInput">
                <label>Select Toss Winner</label>
                <select onChange={(e) => setTossWinner(e.target.value)} value={tossWinner || ""}>
                  <option value="" disabled>
                    Select Toss Winner
                  </option>
                  {club1ID && (
                    <option value={club1ID}>
                      {clubs.find((club) => club._id === club1ID)?.name || "Club 1"}
                    </option>
                  )}
                  {club2ID && (
                    <option value={club2ID}>
                      {clubs.find((club) => club._id === club2ID)?.name || "Club 2"}
                    </option>
                  )}
                </select>
              </div>

              <div className="formInput">
                <label>Toss Choice</label>
                <select onChange={(e) => handleTossChoiceChange(e.target.value)} value={tossChoice || ""}>
                  <option value="" disabled>Select Toss Choice</option>
                  <option value="Bat">Bat</option>
                  <option value="Bowl">Bowl</option>
                </select>
              </div>

              <Button loading={buttonLoading} text="Create Match" onClick={handleClick} loadingText="Creating..." />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMatchByClub;
