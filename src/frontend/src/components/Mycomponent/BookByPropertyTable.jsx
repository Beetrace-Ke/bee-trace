import React, { useEffect } from "react";
import {
  Box,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { BookByPropertyThunk } from "@/Redux/action/BookByProperty";
import { useParams, useNavigate } from "react-router-dom";




const BookByPropertyTable = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate('/');
      } else {
        await dispatch(BookByPropertyThunk(id));
      }
    };
    fetchData();
  }, [dispatch, id, navigate]);
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {field:"PropertyId", headerName:"PropertyId", width: 150},
    { field: "VisitorName", headerName: "Name", width: 150 },
    { field: "VisitorEmail", headerName: "Email", width: 150 },
    { field: "VisitDate", headerName: "Visit Period", width: 150 },
    { field: "Amount", headerName: "Paid", width: 150 },
    {
        field: 'Status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
          const statusColors = {
            PENDING:"orange",
            CONFIRMED: "green",
            CANCELED: "red"
          };
          return (
            <Box
              component="span"
              sx={{
                color: statusColors[Object.keys(params.row.Status)],
                fontWeight: 'bold',
              }}
            >
              {Object.keys(params.row.Status)}
            </Box>
          );
        },
    },
    {
        field: 'PaymentStatus',
        headerName: 'PaymentStatus',
        width: 150,
        renderCell: (params) => {
          const statusColors = {
            UNPAID: "orange",
            PAID:"green"
          };
          return (
            <Box
              component="span"
              sx={{
                color: statusColors[Object.keys(params.row.PaymentStatus)],
                fontWeight: 'bold',
              }}
            >
              {Object.keys(params.row.PaymentStatus)}
            </Box>
          );
        },
    },
    { field: "CreatedAt", headerName: "CreatedAt", width: 150 },
  ];
  const  {  loading,BookByProperty,error} = useSelector((state)=>state.BookByProperty)
  return (
    <Box
      sx={{
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        },
      }}
    >
         {loading?
     (<div style={{textAlign: "center"}}>
      <p>Loading....</p>
   </div>):  
   (BookByProperty?.length  === 0|| error)?(
    <div style={{textAlign: "center"}}>
          <p>No Booking</p>
    </div>
  ):(
      <DataGrid
          getRowId={(row)=>(row.id)}
          rows={BookByProperty}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          sx={{
            backgroundColor: '#f5f5f5', // Light gray background
            '& .MuiDataGrid-row': {
              backgroundColor: '#ffffff', // White row background
              '&:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9', // Alternate row color
              },
            },
            boxShadow: '0 4px 10px rgba(200, 200, 200, 0.7)',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        />
      )} 
    </Box>
  );
};

export default BookByPropertyTable;

