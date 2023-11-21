import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "DOB",
    type: "number",
    width: 90,
  },
 
  {
    field: "fullName",
    headerName: "Emp Code",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
    valueGetter: (params) =>
        `${params.row.age || ""}${params.row.lastName || ""}`,
  },
  {
    field: "edit",
    headerName: "EDIT",
    width: 100,
    renderCell: () => {
      return (
        <Box
          width="80%"
          m="0 auto"
          p="1px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <NavLink to="/addteacher" style={{ textDecoration: "none" }}>
            <Button>
              <Typography  color="#4caf50" ><EditIcon/></Typography>
            </Button>
          </NavLink>
        </Box>
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    type: "number",
    width: 100,
    renderCell: () => {
      return (
        <Box
          width="80%"
          m="0 auto"
          p="1px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <Button>
              <Typography color="#f44336"  > <DeleteIcon /></Typography>
            </Button>
          </NavLink>
        </Box>
      );
    },
  },

];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 22 },
  { id: 6, lastName: "Melisandre", firstName: "shailesh", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 500, width: "80%" ,margin:'auto'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
