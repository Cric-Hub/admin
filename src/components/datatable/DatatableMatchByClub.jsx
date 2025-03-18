import "./datatable.scss";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";

const DatatableMatchByClub = ({columns}) => {
  
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const clubId = location.pathname.split("/")[3];
  const [list, setList] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:8000/api/${path}/by-club/${clubId}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/${path}/$${clubId}`,{ withCredentials: true });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      
    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="cellAction">
            <Link to={`/matches/update/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Update</div>
            </Link>
            <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
            >
                Delete
            </div>
            </div>
        );
        },

    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/by-club/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={list}
        className="datagrid"

        columns={
          [
            { field: "_id", headerName: "ID", width: 120 },
            {field: "club1", headerName: "club 1", width: 170,
              valueGetter: (params) => params.row.club1.club.name || "No Club"
            },
            {
              field: "club2", headerName: "club 2", width: 170,
              valueGetter: (params) => params.row.club2.club.name || "No Club"
            },
            ...actionColumn,
          ]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
        getRowId={row => row._id}
      />
    </div>
  );
};

export default DatatableMatchByClub;
