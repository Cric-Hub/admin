import React from 'react'
import axios from "axios";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";

const RankUpdate = () => {
    const updateRankings = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/ranking/update-rankings");
    alert(response.data.message);
  } catch (err) {
    alert("Failed to update rankings: " + err.message);
  }
};
  return (
        <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
            <button onClick={updateRankings}>Update Rankings</button>
      </div>
    </div>
  )
}

export default RankUpdate