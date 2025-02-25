import "./datatable.scss";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";

const DatatableMatch = ({columns}) => {
  
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:8000/api/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/${path}/${id}`,{ withCredentials: true });
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
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default DatatableMatch;
