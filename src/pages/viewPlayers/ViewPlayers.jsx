import "./viewPlayers.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewPlayers = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/players/${id}`);
        setPlayer(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch player data");
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Player Information</h1>
            <div className="item">
              <img
                src={player.img || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                alt={`${player.name}'s profile`}
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{player.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Date of Birth:</span>
                  <span className="itemValue">
                    {new Date(player.dob).toLocaleDateString()}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{player.role}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Batting Style:</span>
                  <span className="itemValue">{player.battingStyle}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bowling Style:</span>
                  <span className="itemValue">{player.bowlingStyle}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bio:</span>
                  <span className="itemValue">{player.bio}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="bottom">
          <div className="stats-container">
            {/* Batting Section */}
            <div className="stat-card">
              <h3 className="stat-title">BATTING</h3>
              <div className="stat-details">
                <div className="stat-row">
                  <span className="stat-label">MATCHES</span>
                  <span className="stat-value">{player.batting.matches}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">INNINGS</span>
                  <span className="stat-value">{player.batting.innings}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">NOT OUTS</span>
                  <span className="stat-value">{player.batting.notOuts}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">TOTAL RUNS</span>
                  <span className="stat-value">{player.batting.runs}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">HIGHEST SCORE</span>
                  <span className="stat-value">{player.batting.highestScore}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">BATTING AVG</span>
                  <span className="stat-value">{player.batting.average}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">BALLS FACED</span>
                  <span className="stat-value">{player.batting.ballsFaced}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">STRIKE RATE</span>
                  <span className="stat-value">{player.batting.strikeRate}</span>
                </div>
              </div>
            </div>

            {/* Bowling Section */}
            <div className="stat-card">
              <h3 className="stat-title">BOWLING</h3>
              <div className="stat-details">
                <div className="stat-row">
                  <span className="stat-label">MATCHES</span>
                  <span className="stat-value">{player.bowling.matches}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">INNINGS</span>
                  <span className="stat-value">{player.bowling.innings}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">BALLS BOWLED</span>
                  <span className="stat-value">{player.bowling.ballsBowled}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">RUNS CONCEDED</span>
                  <span className="stat-value">{player.bowling.runsConceded}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">WICKETS</span>
                  <span className="stat-value">{player.bowling.wickets}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">ECONOMY</span>
                  <span className="stat-value">{player.bowling.economy}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">BOWLING AVG</span>
                  <span className="stat-value">{player.bowling.average}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">STRIKE RATE</span>
                  <span className="stat-value">{player.bowling.strikeRate}</span>
                </div>
              </div>
            </div>

            {/* Fielding Section */}
            <div className="stat-card">
              <h3 className="stat-title">FIELDING</h3>
              <div className="stat-details">
                <div className="stat-row">
                  <span className="stat-label">CATCHES</span>
                  <span className="stat-value">{player.fielding.catches}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">RUN OUTS</span>
                  <span className="stat-value">{player.fielding.runOuts}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">STUMPINGS</span>
                  <span className="stat-value">{player.fielding.stumpings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlayers;