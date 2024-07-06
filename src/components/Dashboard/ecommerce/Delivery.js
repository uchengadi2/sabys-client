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

function Delivery(props) {
  const classes = useStyles();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);

  const [deliveriesList, setDeliveriesList] = useState([]);
  const [updateDeliveryCounter, setUpdateDeliveryCounter] = useState(false);
  const [updateEdittedDeliveryCounter, setUpdateEdittedDeliveryCounter] =
    useState(false);
  const [updateDeletedDeliveryCounter, setUpdateDeletedDeliveryCounter] =
    useState(false);
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
      const response = await api.get(`/deliveries`, {
        params: { shopType: "online" },
      });
      const workingData = response.data.data.data;
      workingData.map((delivery) => {
        allData.push({
          id: delivery._id,
          orderNumber: delivery.orderNumber,
          transaction: delivery.transaction,
          customer: delivery.customer,
          dateOrdered: delivery.dateOrdered,
          customerEmail: delivery.customerEmail,
          customerPhoneNumber: delivery.customerPhoneNumber,
          recipientName: delivery.recipientName,
          recipientPhoneNumber: delivery.recipientPhoneNumber,
          recipientAddress: delivery.recipientAddress,
          destinationState: delivery.destinationState,
          destinationCountry: delivery.destinationCountry,
          status: delivery.status,
          logisticsPartner: delivery.logisticsPartner,
          dateAssigned: delivery.dateAssigned,
          assignedBy: delivery.assignedBy,
          deliveryCommencementDate: delivery.deliveryCommencementDate,
          deliveryCompletedDate: delivery.deliveryCompletedDate,
          shopType: delivery.shopType,
          deliveryMode: delivery.deliveryMode,
        });
      });
      setDeliveriesList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateDeliveryCounter,
    updateEdittedDeliveryCounter,
    updateDeletedDeliveryCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddOpen = () => {
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

  const renderDeliveryUpdateCounter = () => {
    setUpdateDeliveryCounter((prevState) => !prevState);
  };

  const renderDeliveryEdittedUpdateCounter = () => {
    setUpdateEdittedDeliveryCounter((prevState) => !prevState);
  };

  const renderDeliveryDeletedUpdateCounter = () => {
    setUpdateDeletedDeliveryCounter((prevState) => !prevState);
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
        field: "shopType",
        headerName: "Transaction From",
        width: 150,

        //editable: true,
      },
      {
        field: "logisticsPartner",
        headerName: "Carrier",
        width: 250,

        //editable: true,
      },
      {
        field: "deliveryMode",
        headerName: `Delivery Mode`,
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryCommencementDate",
        headerName: "Delivery Commencement Date",
        width: 150,

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
        headerName: `Delivery Status`,
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

    deliveriesList.map((delivery, index) => {
      let row = {
        numbering: ++counter,
        id: delivery.id,
        orderNumber: delivery.orderNumber
          ? delivery.orderNumber.toUpperCase()
          : "",
        transaction: delivery.transaction.orderNumber
          ? delivery.transaction.orderNumber.toUpperCase()
          : "",
        deliveryCommencementDate: delivery.deliveryCommencementDate
          ? new Date(delivery.deliveryCommencementDate).toLocaleDateString()
          : "",
        customer: delivery.customer
          ? delivery.customer.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        shopType: delivery.shopType
          ? delivery.shopType.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        logisticsPartner: delivery.logisticsPartner
          ? delivery.logisticsPartner.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        deliveryMode: delivery.deliveryMode
          ? delivery.deliveryMode.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        destinationCountry: delivery.destinationCountry
          ? delivery.destinationCountry.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        destinationState: delivery.destinationState
          ? delivery.destinationState.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        status: delivery.status
          ? delivery.status.replace(
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
            <Grid item xs={9.6}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Deliveries</Typography>
            </Grid>
            <Grid item xs={2.4}>
              <div>
                <Button variant="contained" onClick={handleEditOpen}>
                  Update Delivery Status
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

export default Delivery;
