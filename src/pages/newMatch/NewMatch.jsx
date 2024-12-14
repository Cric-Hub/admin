//import "./newMatch.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useToast } from "../../context/ToastContext";

const NewMatch = () => {
  const [info, setInfo] = useState({});
  const [club1, setClub1] = useState("");
  const [club2, setClub2] = useState("");
  const [players, setPlayers] = useState([]);
  const { data: clubs, loading: clubsLoading } = useFetch("http://localhost:8000/api/clubs");
  const { data: club1Players, loading: club1Loading } = useFetch(`http://localhost:8000/api/players?club=${club1}`);
  const { data: club2Players, loading: club2Loading } = useFetch(`http://localhost:8000/api/players?club=${club2}`);
  const showToast = useToast();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlayerSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlayers((prev) => [...prev, value]);
    } else {
      setPlayers((prev) => prev.filter((player) => player !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!club1 || !club2 || players.length === 0) {
      showToast("Please fill all fields and select players.", "warn");
      return;
    }

    const newMatch = {
      ...info,
      club1,
      club2,
      players,
    };

    try {
      await axios.post("http://localhost:8000/api/matches", newMatch);
      showToast("Match created successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error creating match. Try again.", "error");
    }
  };

  return (
    <div className="newMatch">
      <Sidebar />
      <div className="newMatchContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Match</h1>
        </div>
        <div className="bottom">
          <form>
            <div className="formInput">
              <label>Match Name</label>
              <input type="text" name="name" placeholder="Match Name" onChange={handleChange} />
            </div>
            <div className="formInput">
              <label>Match Date</label>
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <div className="formInput">
              <label>Match Venue</label>
              <input type="text" name="venue" placeholder="Venue" onChange={handleChange} />
            </div>
            <div className="formInput">
              <label>Select Club 1</label>
              <select value={club1} onChange={(e) => setClub1(e.target.value)}>
                <option value="" disabled>Select Club 1</option>
                {clubsLoading ? (
                  <option>Loading...</option>
                ) : (
                  clubs.map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="formInput">
              <label>Select Club 2</label>
              <select value={club2} onChange={(e) => setClub2(e.target.value)}>
                <option value="" disabled>Select Club 2</option>
                {clubsLoading ? (
                  <option>Loading...</option>
                ) : (
                  clubs.map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="formInput">
              <label>Select Players</label>
              <div className="playersSelection">
                {club1Loading || club2Loading
                  ? "Loading Players..."
                  : [...club1Players, ...club2Players].map((player) => (
                      <div key={player._id}>
                        <input
                          type="checkbox"
                          id={player._id}
                          value={player._id}
                          onChange={handlePlayerSelection}
                        />
                        <label htmlFor={player._id}>{player.name}</label>
                      </div>
                    ))}
              </div>
            </div>
            <button onClick={handleSubmit}>Create Match</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMatch;
