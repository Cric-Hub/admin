//import "./viewUsers.scss";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProfileUpdateNew from "../../components/profileUpdate/ProfileUpdateNew";


const Settings = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
            <ProfileUpdateNew />
      </div>
    </div>
  );
};

export default Settings;
