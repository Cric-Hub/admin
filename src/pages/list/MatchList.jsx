import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableMatch from "../../components/datatable/DatatableMatch"

const MatchList = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableMatch columns={columns}/>
      </div>
    </div>
  )
}

export default MatchList