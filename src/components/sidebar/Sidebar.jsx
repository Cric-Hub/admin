import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
//import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
//import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
//import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
//import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NewsIcon from '@mui/icons-material/Article';
import ClubPlayersIcon from '@mui/icons-material/Groups2';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useSnackbar } from "notistack";
import { useConfirmation } from "../../context/ConfirmationContext.js";

const Sidebar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { showConfirmation } = useConfirmation();
  const { user, dispatch } = useContext(AuthContext);
  const { dispatchDarkMode } = useContext(DarkModeContext);
  
  const confirmLogout = (id) => {
    showConfirmation({
      message: "Are you sure you want to logout!",
      onConfirm: () => handleLogout(),
      onCancel: () => enqueueSnackbar("logout cancelled!", { variant: "info" }),
      confirmLabel: "Yes, Logout",
      cancelLabel: "No, StayLoggedin",
    });
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CricHub</span>
        </Link>
      </div>

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          {user && user.isAdmin &&(<p className="title">SYSTEM</p>)}

          {user && user.isAdmin &&(<Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/players" style={{ textDecoration: "none" }}>
            <li>
              <ClubPlayersIcon className="icon" />
              <span>Players</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/clubs" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Clubs</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/matches" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Matches</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/news" style={{ textDecoration: "none" }}>
            <li>
              <NewsIcon className="icon" />
              <span>News</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/ranking" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Ranking</span>
            </li>
          </Link>)}

            <p className="title">My CLUB</p>
          <Link to={`/players/by-club/${user.club}`} style={{ textDecoration: "none" }}>
            <li>
              <ClubPlayersIcon className="icon" />
              <span>Players</span>
            </li>
          </Link>
          <Link to={`/matches/by-club/${user.club}`} style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Match</span>
          </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to={`/settings`} style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to={`/profile`} style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li onClick={confirmLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatchDarkMode({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatchDarkMode({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
