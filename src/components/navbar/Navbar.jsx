import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { userColumns } from "../../datatablesource";
import { AuthContext } from "../../context/AuthContext";
import UserProfile from "../userProfile/UserProfile";

const Navbar = () => {
  const { darkMode, dispatchDarkMode } = useContext(DarkModeContext); 
  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatchDarkMode({ type: "TOGGLE" })} 
            />
          </div>
          <div className="item"><UserProfile /></div>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
