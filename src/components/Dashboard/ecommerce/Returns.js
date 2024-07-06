import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Returns(props) {
  const classes = useStyles();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [updateReturnsCounter, setUpdateReturnsCounter] = useState(false);
  const [updateEdittedReturnsCounter, setUpdateEdittedReturnsCounter] =
    useState(false);
  const [updateDeletedReturnsCounter, setUpdateDeletedReturnsCounter] =
    useState(false);
  const [returnsList, setReturnsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/returns`, {
        params: { shopType: "online" },
      });
      const workingData = response.data.data.data;
      workingData.map((returns) => {
        allData.push({
          id: returns._id,
          orderNumber: returns.orderNumber,
          transaction: returns.transaction,
          customer: returns.customer,
          dateOrdered: returns.dateOrdered,
          customerEmail: returns.customerEmail,
          customerPhoneNumber: returns.customerPhoneNumber,
          recipientName: returns.recipientName,
          recipientPhoneNumber: returns.recipientPhoneNumber,
          recipientAddress: returns.recipientAddress,
          destinationState: returns.destinationState,
          destinationCountry: returns.destinationCountry,
          status: returns.status,
          logisticsPartner: returns.logisticsPartner,
          dateAssigned: returns.dateAssigned,
          shopType: returns.shopType,
          deliveryMode: returns.deliveryMode,
          dateReturned: returns.dateReturned,
        });
      });
      setReturnsList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateReturnsCounter,
    updateEdittedReturnsCounter,
    updateDeletedReturnsCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleOnboardOpen = () => {
    //setOnboardOpen(true);
  };

  const handleDialogOpenStatus = () => {
    setOpen(false);
  };

  const handleEditDialogOpenStatus = () => {
    setEditOpen(false);
  };

  const handleDeleteDialogOpenStatus = () => {
    setDeleteOpen(false);
  };

  const renderReturnsUpdateCounter = () => {
    setUpdateReturnsCounter((prevState) => !prevState);
  };

  const renderReturnsEdittedUpdateCounter = () => {
    setUpdateEdittedReturnsCounter((prevState) => !prevState);
  };

  const renderReturnsDeletedUpdateCounter = () => {
    setUpdateDeletedReturnsCounter((prevState) => !prevState);
  };

  const handleSuccessfulCreateSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };
  const handleSuccessfulEditSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleSuccessfulDeletedItemSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  const onRowsSelectionHandler = (ids, rows) => {
    const selectedIDs = new Set(ids);
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRows(selectedRowsData);
    setRowNumber(selectedIDs.size);
    selectedIDs.forEach(function (value) {
      setSelectedRowId(value);
    });
  };

  const renderDataGrid = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      // { field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 100,
      },
      {
        field: "dateOrdered",
        headerName: "Date Ordered",
        width: 150,

        //editable: true,
      },
      {
        field: "dateReturned",
        headerName: "Date Returned",
        width: 150,

        //editable: true,
      },
      {
        field: "shopType",
        headerName: "Transaction From",
        width: 150,

        //editable: true,
      },

      {
        field: "deliveryMode",
        headerName: `Delivery Mode`,
        width: 180,

        //editable: true,
      },
      {
        field: "orderNumber",
        headerName: "Order Number",
        width: 150,

        //editable: true,
      },

      {
        field: "status",
        headerName: `Return Status`,
        width: 180,

        //editable: true,
      },

      {
        field: "transaction",
        headerName: `Transaction`,
        width: 180,

        //editable: true,
      },

      {
        field: "customer",
        headerName: "Customer",
        width: 150,

        //editable: true,
      },
      {
        field: "destinationCountry",
        headerName: "Destination Country",
        width: 150,

        //editable: true,
      },
      {
        field: "destinationState",
        headerName: "Destination State",
        width: 150,

        //editable: true,
      },
      {
        field: "logisticsPartner",
        headerName: "Carrier",
        width: 250,

        //editable: true,
      },

      // {
      //   field: "orderaction",
      //   headerName: "",
      //   width: 30,
      //   description: "transaction row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <ViewListIcon
      //         style={{ cursor: "pointer" }}
      //         onClick={() => [
      //           // this.setState({
      //           //   editOpen: true,
      //           //   id: params.id,
      //           //   params: params.row,
      //           // }),
      //           // history.push(`/products/onboard/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
    ];

    returnsList.map((returns, index) => {
      let row = {
        numbering: ++counter,
        id: returns.id,
        orderNumber: returns.orderNumber
          ? returns.orderNumber.toUpperCase()
          : "",
        transaction: returns.transaction.orderNumber
          ? returns.transaction.orderNumber.toUpperCase()
          : "",

        customer: returns.customer
          ? returns.customer.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        shopType: returns.shopType
          ? returns.shopType.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        logisticsPartner: returns.logisticsPartner
          ? returns.logisticsPartner.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        deliveryMode: returns.deliveryMode
          ? returns.deliveryMode.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        destinationCountry: returns.destinationCountry
          ? returns.destinationCountry.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        destinationState: returns.destinationState
          ? returns.destinationState.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        status: returns.status
          ? returns.status.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
      };
      rows.push(row);
    });

    return (
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids, rows)}
        sx={{
          boxShadow: 3,
          border: 3,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} direction="column">
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Returns</Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Manage Returns
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  {/* <CircularProgress color="inherit" /> */}
                </Backdrop>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ height: 700, width: "100%" }}>
            {loading && <CircularProgress style={{ marginLeft: "50%" }} />}
            {!loading && renderDataGrid()}
          </Box>
        </Grid>
        <Snackbar
          open={alert.open}
          message={alert.message}
          ContentProps={{
            style: { backgroundColor: alert.backgroundColor },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setAlert({ ...alert, open: false })}
          autoHideDuration={4000}
        />
      </Grid>
    </Box>
  );
}

export default Returns;
