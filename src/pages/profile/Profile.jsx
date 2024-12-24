
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UserProfile from "../../components/userProfile/UserProfile";


const Profile = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
            <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
