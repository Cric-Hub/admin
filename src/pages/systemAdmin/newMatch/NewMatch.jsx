import "./newMatch.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/buttons/Button";

const NewMatch = ({ inputs, title }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [club1Players, setClub1Players] = useState([]);
  const [club2Players, setClub2Players] = useState([]);
  const [club1ID, setClub1ID] = useState(undefined);
  const [club2ID, setClub2ID] = useState(undefined);
  const [tossWinner, setTossWinner] = useState(undefined);
  const [tossChoice, setTossChoice] = useState(undefined);
  const [currentInnings, setCurrentInnings] = useState("");
  const { data: clubs, loading: clubsLoading } = useFetch("http://localhost:8000/api/clubs");
  const showToast = useToast();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClub1Change = async (e) => {
    const clubId = e.target.value;
    setClub1ID(clubId);
    try {
      const res = await axios.get(`http://localhost:8000/api/players/by-club/${clubId}`, { withCredentials: true });
      setClub1Players(res.data);
    } catch (err) {
      console.error(err);
      showToast("Error fetching players for Club 1", "error");
    }
  };

  const handleClub2Change = async (e) => {
    const clubId = e.target.value;
    setClub2ID(clubId);
    try {
      const res = await axios.get(`http://localhost:8000/api/players/by-club/${clubId}`, { withCredentials: true });
      setClub2Players(res.data);
    } catch (err) {
      console.error(err);
      showToast("Error fetching players for Club 2", "error");
    }
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
      return;
    }

    if (info.overs <= 0) {
      showToast("Overs must be a positive number!", "warn");
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
                    id={input.id}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Select Club 1 (User's Club)</label>
                <select id="club1" onChange={handleClub1Change} value={club1ID || ""}>
                  <option value="" disabled>
                    Select Club 1
                  </option>
                  {clubsLoading
                    ? <option>Loading clubs...</option>
                    : clubs.map((club) => (
                        <option key={club._id} value={club._id}>
                          {club.name}
                        </option>
                      ))}
                </select>
              </div>

              <div className="formInput">
                <label>Select Players for Club 1</label>
                <select
                  multiple
                  onChange={(e) =>
                    setClub1Players(Array.from(e.target.selectedOptions, (opt) => ({ _id: opt.value, name: opt.text })))
                  }
                >
                  {club1Players.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </select>
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
                <label>Select Players for Club 2</label>
                <select
                  multiple
                  onChange={(e) =>
                    setClub2Players(Array.from(e.target.selectedOptions, (opt) => ({ _id: opt.value, name: opt.text })))
                  }
                >
                  {club2Players.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
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
                  <option value={club1ID}>
                    {clubs.find((club) => club._id === club1ID)?.name || "Club 1"}
                  </option>
                  <option value={club2ID}>
                    {clubs.find((club) => club._id === club2ID)?.name || "Club 2"}
                  </option>
                </select>
              </div>

            <div className="formInput">
            <label>Toss Choice</label>
            <select
                onChange={(e) => handleTossChoiceChange(e.target.value)}
                value={tossChoice || ""}
            >
                <option value="" disabled>
                Select Toss Choice
                </option>
                <option value="Bat">Bat</option>
                <option value="Bowl">Bowl</option>
            </select>
            </div>


              <div className="formInput">
                <label>Total Overs</label>
                <input type="number" placeholder="Enter total overs" onChange={handleChange} name="overs" />
              </div>

              <Button
                loading={buttonLoading}        
                text="Create Match"          
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

export default NewMatch;
