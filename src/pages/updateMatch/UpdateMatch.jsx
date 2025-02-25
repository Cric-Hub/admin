import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useToast } from "../../context/ToastContext";
import './updateMatch.scss'
import Button from "../../components/buttons/Button";

const UpdateMatch = ({ title }) => {
  const [match, setMatch] = useState({
    club1: { club: "", players: [], score: 0, wickets: 0, overs: 0 },
    club2: { club: "", players: [], score: 0, wickets: 0, overs: 0 },
    overs: 0,
    tossWinner: "",
    tossChoice: "",
    status: "Live",
    currentInnings: "club1",
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();

useEffect(() => {
    const fetchMatch = async () => {
      try {
        const matchResponse = await axios.get(`http://localhost:8000/api/matches/${id}`);
        setMatch(matchResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchClubs = async () => {
      try {
        const clubsResponse = await axios.get("http://localhost:8000/api/clubs/");
        setClubs(clubsResponse.data); 
      } catch (err) {
        setError("Failed to load clubs");
      }
    };

    fetchMatch();
    fetchClubs();
  }, [id]);

  

  const handleSubmit = async (e) => {
    setButtonLoading(true);
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/matches/${id}`, match,{ withCredentials: true });
      showToast("Match Updated successfully!!", "success");
    } catch (err) {
      setError("Failed to update the match");
    }finally{
      setButtonLoading(false);
    }
  };

  // Function to get the club name by ID
  const getClubNameById = (id) => {
    const club = clubs.find((club) => club._id === id); 
    return club ? club.name : ""; 
  };

  // Function to handle overs input and ensure proper ball count
  const handleOversChange = (club, value) => {
    const overs = parseFloat(value);
    if (overs >= 0) {
      const completedOvers = Math.floor(overs); 
      const balls = Math.round((overs - completedOvers) * 10); 
      
      // If balls exceed 5, move to the next over
      if (balls > 5) {
        setMatch({
          ...match,
          [club]: {
            ...match[club],
            overs: completedOvers + 1, 
          },
        });
      } else {
        setMatch({
          ...match,
          [club]: {
            ...match[club],
            overs: overs,
          },
        });
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="matchUpdate">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Match</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <form onSubmit={handleSubmit}>
              
            </form>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                {/* Dynamic UI based on current innings */}
                {match.currentInnings === "club1" ? (
                  <>
                    <h2 className="clubName">{getClubNameById(match.club1.club)}</h2>
                    {/* <input
                      type="text"
                      value={getClubNameById(match.club1.club)}
                      onChange={(e) =>
                        setMatch({ ...match, club1: { ...match.club1, club: e.target.value } })
                      }
                    /> */}

                    <label>Club 1 Score</label>
                    <input
                      type="number"
                      value={match.club1.score}
                      onChange={(e) =>
                        setMatch({ ...match, club1: { ...match.club1, score: e.target.value } })
                      }
                    />
                    <label>Club 1 Wickets</label>
                    <input
                      type="number"
                      value={match.club1.wickets}
                      onChange={(e) =>
                        setMatch({ ...match, club1: { ...match.club1, wickets: e.target.value } })
                      }
                    />
                    <label>Club 1 Overs</label>
                    <input
                  type="number"
                  step="0.1" // Allows decimal input
                  value={match.club1.overs}
                  onChange={(e) =>
                    handleOversChange("club1", e.target.value)
                  }
                />
                  </>
                ) : (
                  <>
                    <h2 className="clubName">{getClubNameById(match.club2.club)}</h2>
                    {/* <input
                      type="text"
                      value={getClubNameById(match.club2.club)} // Display the club name based on ID
                      onChange={(e) =>
                        setMatch({ ...match, club2: { ...match.club2, club: e.target.value } })
                      }
                    /> */}
                    <label>Club 2 Score</label>
                    <input
                      type="number"
                      value={match.club2.score}
                      onChange={(e) =>
                        setMatch({ ...match, club2: { ...match.club2, score: e.target.value } })
                      }
                    />
                    <label>Club 2 Wickets</label>
                    <input
                      type="number"
                      value={match.club2.wickets}
                      onChange={(e) =>
                        setMatch({ ...match, club2: { ...match.club2, wickets: e.target.value } })
                      }
                    />
                    <label>Club 2 Overs</label>
                    <input
                  type="number"
                  step="0.1" 
                  value={match.club2.overs}
                  onChange={(e) =>
                    handleOversChange("club2", e.target.value)
                  }
                />
                  </>
                )}

                {/* Other match details */}
                <h2 className="title">Match Settings</h2>

                <label>Status</label>
                <select
                  value={match.status}
                  onChange={(e) => setMatch({ ...match, status: e.target.value })}
                >
                  <option value="Live">Live</option>
                  <option value="Completed">Completed</option>
                </select>
                
                <label>Overs</label>
                <input
                  type="number"
                  value={match.overs}
                  onChange={(e) => setMatch({ ...match, overs: e.target.value })}
                />
                {/* Toss Winner Display */}
                <label>Toss Winner</label>
                <select
                  value={match.tossWinner}
                  onChange={(e) => setMatch({ ...match, tossWinner: e.target.value })}
                >
                  <option value={match.club1.club}>{getClubNameById(match.club1.club)}</option>
                  <option value={match.club2.club}>{getClubNameById(match.club2.club)}</option>
                </select>

                <label>Toss Choice</label>
                <select
                  value={match.tossChoice}
                  onChange={(e) => setMatch({ ...match, tossChoice: e.target.value })}
                >
                  <option value="Bat">Bat</option>
                  <option value="Bowl">Bowl</option>
                </select>
                
                <label>Current Innings</label>
                <select
                  value={match.currentInnings}
                  onChange={(e) => setMatch({ ...match, currentInnings: e.target.value })}
                >
                  <option value="club1">Club 1</option>
                  <option value="club2">Club 2</option>
                </select>

                {/* Submit button */}
                <Button
                loading={buttonLoading}        
                text="Update"          
                onClick={handleSubmit}   
                loadingText="Updating..."     
              />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMatch;
