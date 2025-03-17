import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatablePlayers from "../../components/datatable/DatatablePlayers.jsx"

const PlayerList = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatablePlayers columns={columns}/>
      </div>
    </div>
  )
}

export default PlayerList