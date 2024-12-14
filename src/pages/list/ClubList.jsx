import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableClub from "../../components/datatable/DatatableClub.jsx"

const ClubList = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableClub columns={columns}/>
      </div>
    </div>
  )
}

export default ClubList