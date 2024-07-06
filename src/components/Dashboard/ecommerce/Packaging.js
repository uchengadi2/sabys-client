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
import ViewListIcon from "@mui/icons-material/ViewList";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
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

function Packaging(props) {
  const classes = useStyles();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [updateOrderListCounter, setUpdateOrderListCounter] = useState(false);
  const [updateEdittedOrderListCounter, setUpdateEdittedOrderListCounter] =
    useState(false);
  const [updateDeletedOrderListCounter, setUpdateDeletedOrderListCounter] =
    useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [currencyName, setCurrencyName] = useState();
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
      const response = await api.get(`/transactions`, {
        params: { shopType: "online" },
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
    updateOrderListCounter,
    updateEdittedOrderListCounter,
    updateDeletedOrderListCounter,
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

  const renderOrderListUpdateCounter = () => {
    setUpdateOrderListCounter((prevState) => !prevState);
  };

  const renderOrderListEdittedUpdateCounter = () => {
    setUpdateEdittedOrderListCounter((prevState) => !prevState);
  };

  const renderOrderListDeletedUpdateCounter = () => {
    setUpdateDeletedOrderListCounter((prevState) => !prevState);
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
      {
        field: "orderaction",
        headerName: "",
        width: 30,
        description: "transaction row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <ViewListIcon
              style={{ cursor: "pointer" }}
              onClick={() => [
                // this.setState({
                //   editOpen: true,
                //   id: params.id,
                //   params: params.row,
                // }),
                // history.push(`/products/onboard/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
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
            <Grid item xs={8.2}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h5">Packaging & Offboarding</Typography>
            </Grid>
            <Grid item xs={3.8}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  {/* <Button variant="contained" onClick={handleAddOpen}>
                    Confirm Payment
                  </Button> */}
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      {/* <ProductForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductUpdateCounter={renderProductUpdateCounter}
                      /> */}
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleEditOpen}>
                    Offboard Products
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditOpen(false)]}
                  >
                    <DialogContent>
                      {/* <ProductEditForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleFailedSnackbar={handleFailedSnackbar}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        renderProductEdittedUpdateCounter={
                          renderProductEdittedUpdateCounter
                        }
                      /> */}
                    </DialogContent>
                  </Dialog>

                  <Button variant="contained" onClick={handleDeleteOpen}>
                    Package Order
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      {/* <ProductDeleteForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDeleteDialogOpenStatus={
                          handleDeleteDialogOpenStatus
                        }
                        handleSuccessfulDeletedItemSnackbar={
                          handleSuccessfulDeletedItemSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductDeletedUpdateCounter={
                          renderProductDeletedUpdateCounter
                        }
                      /> */}
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

export default Packaging;
