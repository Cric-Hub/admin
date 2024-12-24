import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { use } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useConfirmation } from "../../context/ConfirmationContext.js";
import { useSnackbar } from "notistack";

const Datatable = ({ columns}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { showConfirmation } = useConfirmation();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:8000/api/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      enqueueSnackbar("Item deleted successfully!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to delete item.", { variant: "error" });
    }
    
  };

  const confirmDelete = (id) => {
    showConfirmation({
      message: "Are you sure you want to delete this item?",
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
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
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
        {path}
        <Link to={`/${path}/new`} className="link">
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

export default Datatable;
