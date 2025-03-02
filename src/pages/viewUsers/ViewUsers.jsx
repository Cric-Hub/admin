import "./viewUsers.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; 

const ViewUsers = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${path}`);
        setUser(res.data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchUser();
  }, [path]);

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
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user.img} alt={`${user.name}'s profile`} className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">
                    {user.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="bottom">
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
