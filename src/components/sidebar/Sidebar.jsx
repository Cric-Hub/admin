import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";

const Sidebar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { dispatchDarkMode } = useContext(DarkModeContext);
  

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CricHub</span>
        </Link>
      </div>
      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">SYSTEM</p>

          {user && user.isAdmin &&(<Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/players" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Players</span>
            </li>
          </Link>)}

          {user && user.isAdmin &&(<Link to="/clubs" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Clubs</span>
            </li>
          </Link>)}

            <p className="title">CLUB</p>
          <Link to={`/players/by-club?clubId=${user.club}`} style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>My Club</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Match</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
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
