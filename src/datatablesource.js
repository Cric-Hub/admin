export const userColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.png"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "city",
    headerName: "City",
    width: 150,
  },
];

export const clubColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "location",
    headerName: "Location",
    width: 230,
    
  },
];

export const playerColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "club",
    headerName: "Club",
    width: 230,
  },
];

export const matchColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "club",
    headerName: "Club",
    width: 230,
  },
];


export const clubPlayerColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "club",
    headerName: "Club",
    width: 230,
  },
];


export const clubMatchColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "club",
    headerName: "Club",
    width: 230,
  },
];

export const newsColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "title",
    headerName: "Title",
    width: 330,
  },
  {
    field: "publishedDate",
    headerName: "PublishedDate",
    width: 330,
  },
];