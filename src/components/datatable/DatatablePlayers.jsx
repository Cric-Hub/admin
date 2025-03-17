import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useConfirmation } from "../../context/ConfirmationContext.js";
import useFetch from "../../hooks/useFetch.js";

const Datatable = ({ columns}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { showConfirmation } = useConfirmation();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:8000/api/players`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/players/${id}`, { withCredentials: true });
      setList(list.filter((item) => item._id !== id));
      enqueueSnackbar("Item deleted successfully!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to delete item.", { variant: "error" });
    }
    
  };

  const confirmDelete = (id) => {
    showConfirmation({
      message: "Are you sure you want to delete this Player?",
      onConfirm: () => handleDelete(id),
      onCancel: () => enqueueSnackbar("Action cancelled!", { variant: "info" }),
      confirmLabel: "Yes, Delete",
      cancelLabel: "No, Keep",
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/players/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => confirmDelete(params.row._id)}
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
        players
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={list}
        columns={[
          { field: "_id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 200 },
          {
            field: "image",
            headerName: "Image",
          width: 100,
          renderCell: (params) => (
            <img
              src={params.row.img} 
              alt="player"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              ),
            },
          {
            field: "club",
            headerName: "Club Name",
            width: 200,
            valueGetter: (params) => params.row.club?.name || "No Club",
          },
          ...actionColumn, 
        ]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
