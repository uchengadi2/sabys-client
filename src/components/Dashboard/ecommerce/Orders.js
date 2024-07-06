import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import Snackbar from "@material-ui/core/Snackbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ViewListIcon from "@mui/icons-material/ViewList";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import TransactionForm from "./TransactionForm";
import UpdateDeliveryStatusForm from "./UpdateDeliveryStatusForm";
import RejectTransactionForm from "./RejectTransactionForm";
import PlaceOrderForm from "./PlaceOrderForm";

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

function Orders(props) {
  const classes = useStyles();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editDeliveryOpen, setEditDeliveryOpen] = useState(false);
  const [editRejectOpen, setEditRejectOpen] = useState(false);
  const [placeOrderOpen, setPlaceOrderOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [updateTransactionCounter, setUpdateTransactionCounter] =
    useState(false);
  const [updateEdittedTransactionCounter, setUpdateEdittedTransactionCounter] =
    useState(false);
  const [
    updateRejectedTransactionCounter,
    setUpdateRejectedTransactionCounter,
  ] = useState(false);
  const [
    updatePlaceOrderTransactionCounter,
    setUpdatePlaceOrderTransactionCounter,
  ] = useState(false);

  const [transactionList, setTransactionList] = useState([]);
  const [currencyName, setCurrencyName] = useState();
  const [rowSelected, setRowSelected] = useState(false);
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
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/transactions`, {
        params: { shopType: "online", status: "unprocessed" },
      });
      const workingData = response.data.data.data;
      workingData.map((transaction) => {
        allData.push({
          id: transaction._id,
          orderNumber: transaction.orderNumber,
          currency: transaction.currency,
          totalDeliveryCost: transaction.totalDeliveryCost,
          totalProductCost: transaction.totalProductCost,
          transactionDate: transaction.transactionDate,
          orderedBy: transaction.orderedBy,
          paymentStatus: transaction.paymentStatus,
          paymentMethod: transaction.paymentMethod,
          status: transaction.status,
          rejectionReason: transaction.rejectionReason,
          customerName: transaction.customerName,
          customerPhoneNumber: transaction.customerPhoneNumber,
          customerEmailAddress: transaction.customerEmailAddress,
          customerEmailAddress: transaction.customerEmailAddress,
          recipientName: transaction.recipientName,
          recipientPhoneNumber: transaction.recipientPhoneNumber,
          recipientEmailAddress: transaction.recipientEmailAddress,
          recipientAddress: transaction.recipientAddress,
          nearestBusstop: transaction.nearestBusstop,
          postalCode: transaction.postalCode,
          recipientCountry: transaction.recipientCountry,
          recipientState: transaction.recipientState,
          recipientCity: transaction.recipientCity,
          vatRate: transaction.vatRate,
          vat: transaction.vat,
          totalWeight: transaction.totalWeight,
          payOnDeliveryMaxWeightInKg: transaction.payOnDeliveryMaxWeightInKg,
          implementVatCollection: transaction.implementVatCollection,
          salesTax: transaction.salesTax,
          revenue: transaction.revenue,
          origin: transaction.origin,
          allowOriginSalesTax: transaction.allowOriginSalesTax,
          implementSalesTaxCollection: transaction.implementSalesTaxCollection,
          deliveryStatus: transaction.deliveryStatus,
          deliveryMode: transaction.deliveryMode,
          daysToDelivery: transaction.daysToDelivery,
          recipientCountryName: transaction.recipientCountryName,
          recipientStateName: transaction.recipientStateName,
          recipientCityName: transaction.recipientCityName,
          shopType: transaction.shopType,
        });
      });
      setTransactionList(allData);
      //setCurrencyName(allData[0].currency.name.toLowerCase());

      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateTransactionCounter,
    updateEdittedTransactionCounter,
    updateRejectedTransactionCounter,
    updatePlaceOrderTransactionCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleClose = () => {
    setConfirmOpen(false);
  };
  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleEditDeliveryOpen = () => {
    setEditDeliveryOpen(true);
  };

  const handleEditRejectOpen = () => {
    setEditRejectOpen(true);
  };

  const handlePlaceOrderOpen = () => {
    setPlaceOrderOpen(true);
  };

  const handleDialogOpenStatus = () => {
    setConfirmOpen(false);
  };

  const handleEditDialogOpenStatus = () => {
    setEditDeliveryOpen(false);
  };

  const handleEditRejectDialogOpenStatus = () => {
    setEditRejectOpen(false);
  };

  const handlePlaceOrderDialogOpenStatus = () => {
    setPlaceOrderOpen(false);
  };

  const renderTransactionUpdateCounter = () => {
    setUpdateTransactionCounter((prevState) => !prevState);
  };

  const renderTransactionEdittedUpdateCounter = () => {
    setUpdateEdittedTransactionCounter((prevState) => !prevState);
  };

  const renderTransactionRejectedUpdateCounter = () => {
    setUpdateRejectedTransactionCounter((prevState) => !prevState);
  };

  const renderPlaceOrderTransactionUpdateCounter = () => {
    setUpdatePlaceOrderTransactionCounter((prevState) => !prevState);
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

  const handleSuccessfulRejectedItemSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleSuccessfulPlaceOrderItemSnackbar = (message) => {
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
    if (selectedIDs.size === 1) {
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  };

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
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
        field: "transactionDate",
        headerName: "Transaction Date",
        width: 150,

        //editable: true,
      },
      {
        field: "orderNumber",
        headerName: "Order Number",
        width: 200,

        //editable: true,
      },
      {
        field: "shopType",
        headerName: "Transaction From",
        width: 150,

        //editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,

        //editable: true,
      },
      {
        field: "paymentStatus",
        headerName: "Payment Status",
        width: 150,

        //editable: true,
      },
      {
        field: "totalProductCost",
        headerName: `Total Product Cost`,
        width: 180,

        //editable: true,
      },
      {
        field: "totalDeliveryCost",
        headerName: `Total Delivery Cost`,
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryStatus",
        headerName: `Delivery Status`,
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryMode",
        headerName: `Delivery Mode`,
        width: 180,

        //editable: true,
      },
      {
        field: "daysToDelivery",
        headerName: `Days To Delivery`,
        width: 180,

        //editable: true,
      },
      {
        field: "paymentMethod",
        headerName: `Payment Method`,
        width: 180,

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

    transactionList.map((transaction, index) => {
      let row = {
        numbering: ++counter,
        id: transaction.id,
        orderNumber: transaction.orderNumber.toUpperCase(),
        totalProductCost: transaction.totalProductCost,
        totalDeliveryCost: transaction.totalDeliveryCost,
        transactionDate: transaction.transactionDate
          ? new Date(transaction.transactionDate).toLocaleDateString()
          : "",
        status: transaction.status.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        shopType: transaction.shopType.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        deliveryStatus: transaction.deliveryStatus.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        deliveryMode: transaction.deliveryMode.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),

        daysToDelivery: transaction.daysToDelivery,
        paymentMethod: transaction.paymentMethod,
        paymentStatus: transaction.paymentStatus,
        rejectionReason: transaction.rejectionReason,
        customerName: transaction.customerName,
        customerPhoneNumber: transaction.customerPhoneNumber,
        customerEmailAddress: transaction.customerEmailAddress,
        customerEmailAddress: transaction.customerEmailAddress,
        recipientName: transaction.recipientName,
        recipientPhoneNumber: transaction.recipientPhoneNumber,
        recipientEmailAddress: transaction.recipientEmailAddress,
        recipientAddress: transaction.recipientAddress,
        nearestBusstop: transaction.nearestBusstop,
        postalCode: transaction.postalCode,
        recipientCountry: transaction.recipientCountry,
        recipientState: transaction.recipientState,
        recipientCity: transaction.recipientCity,
        vatRate: transaction.vatRate,
        vat: transaction.vat,
        totalWeight: transaction.totalWeight,
        payOnDeliveryMaxWeightInKg: transaction.payOnDeliveryMaxWeightInKg,
        implementVatCollection: transaction.implementVatCollection,
        salesTax: transaction.salesTax,
        revenue: transaction.revenue,
        origin: transaction.origin,
        allowOriginSalesTax: transaction.allowOriginSalesTax,
        implementSalesTaxCollection: transaction.implementSalesTaxCollection,
        deliveryStatus: transaction.deliveryStatus,
        deliveryMode: transaction.deliveryMode,
        daysToDelivery: transaction.daysToDelivery,
        recipientCountryName: transaction.recipientCountryName,
        recipientStateName: transaction.recipientStateName,
        recipientCityName: transaction.recipientCityName,
        currency: transaction.currency,
        currencyName: transaction.currency.name,
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
            <Grid item xs={4.2}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Transactions</Typography>
            </Grid>
            <Grid item xs={7.8}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="contained"
                    onClick={handleConfirmOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Confirm Payment
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={confirmOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setConfirmOpen(false)]}
                  >
                    <DialogContent>
                      <TransactionForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderTransactionUpdateCounter={
                          renderTransactionUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleEditDeliveryOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Update Delivery Status
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editDeliveryOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditDeliveryOpen(false)]}
                  >
                    <DialogContent>
                      <UpdateDeliveryStatusForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleFailedSnackbar={handleFailedSnackbar}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        renderTransactionEdittedUpdateCounter={
                          renderTransactionEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="contained"
                    onClick={handleEditRejectOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Reject Transaction
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editRejectOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditRejectOpen(false)]}
                  >
                    <DialogContent>
                      <RejectTransactionForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditRejectDialogOpenStatus={
                          handleEditRejectDialogOpenStatus
                        }
                        handleSuccessfulRejectedItemSnackbar={
                          handleSuccessfulRejectedItemSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderTransactionRejectedUpdateCounter={
                          renderTransactionRejectedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handlePlaceOrderOpen}>
                    Place Order
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={placeOrderOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setPlaceOrderOpen(false)]}
                  >
                    <DialogContent>
                      <PlaceOrderForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handlePlaceOrderDialogOpenStatus={
                          handlePlaceOrderDialogOpenStatus
                        }
                        handleSuccessfulPlaceOrderItemSnackbar={
                          handleSuccessfulPlaceOrderItemSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderPlaceOrderTransactionUpdateCounter={
                          renderPlaceOrderTransactionUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                </Stack>
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

export default Orders;
