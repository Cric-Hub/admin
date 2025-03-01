import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

// Importing MUI Icons
import GroupIcon from "@mui/icons-material/Group"; // Users
import SportsCricketIcon from "@mui/icons-material/SportsCricket"; // Players
import ArticleIcon from "@mui/icons-material/Article"; // News
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // Ranking
import StoreIcon from "@mui/icons-material/Store"; // Clubs
import EventIcon from "@mui/icons-material/Event"; // Matches
import HomeIcon from "@mui/icons-material/Home"; // My Club
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"; // My Players

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="cardsContainer">
          <Link to="/users" className="card">
            <GroupIcon className="icon" />
            <h2>Users</h2>
          </Link>
          <Link to="/players" className="card">
            <SportsCricketIcon className="icon" />
            <h2>Players</h2>
          </Link>
          <Link to="/news" className="card">
            <ArticleIcon className="icon" />
            <h2>News</h2>
          </Link>
          <Link to="/ranking" className="card">
            <LeaderboardIcon className="icon" />
            <h2>Ranking</h2>
          </Link>
          <Link to="/clubs" className="card">
            <StoreIcon className="icon" />
            <h2>Club</h2>
          </Link>
          <Link to="/matches" className="card">
            <EventIcon className="icon" />
            <h2>Match</h2>
          </Link>
          <Link to={`/matches/by-club/${user.club}`} className="card">
            <EventIcon className="icon" />
            <h2>Club Match</h2>
          </Link>
          <Link to={`/players/by-club/${user.club}`} className="card">
            <EmojiPeopleIcon className="icon" />
            <h2>My Players</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
