import React from 'react'
import axios from "axios";

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
    <div>
        <button onClick={updateRankings}>Update Rankings</button>
    </div>
  )
}

export default RankUpdate