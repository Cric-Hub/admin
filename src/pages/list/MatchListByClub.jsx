import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableMatchByClub from "../../components/datatable/DatatableMatchByClub"

const MatchListByClub = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableMatchByClub columns={columns}/>
      </div>
    </div>
  )
}

export default MatchListByClub