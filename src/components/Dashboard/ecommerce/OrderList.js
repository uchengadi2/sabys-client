import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
import ConfirmStockAvailabilityForm from "./ConfirmStockAvailabilityForm";
import UpdatePackageReadinessForm from "./UpdatePackageReadinessForm";

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

function OrderList(props) {
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
  const [
    updateOrderListPackageReadinessCounter,
    setUpdateOrderListPackageReadinessCounter,
  ] = useState(false);
  const [orderList, setOrderList] = useState([]);
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
      const response = await api.get(`/orders`);
      const workingData = response.data.data.data;
      workingData.map((order) => {
        allData.push({
          id: order._id,
          orderNumber: order.orderNumber,
          cartId: order.cartId,
          transaction: order.transactionId,
          product: order.product,
          productCategory: order.productCategory,
          productVendor: order.productVendor,
          quantityAdddedToCart: order.quantityAdddedToCart,
          orderedQuantity: order.orderedQuantity,
          orderedPrice: order.orderedPrice,
          currency: order.currency,
          customerName: order.customerName,
          customerPhoneNumber: order.customerPhoneNumber,
          customerEmailAddress: order.customerEmailAddress,
          recipientName: order.recipientName,
          recipientPhoneNumber: order.recipientPhoneNumber,
          recipientEmailAddress: order.recipientEmailAddress,
          recipientAddress: order.recipientAddress,
          postalCode: order.postalCode,
          nearestBusstop: order.nearestBusstop,
          recipientCountry: order.recipientCountry,
          recipientState: order.recipientState,
          recipientCity: order.recipientCity,
          dateAddedToCart: order.dateAddedToCart,
          dateOrdered: order.dateOrdered,
          orderedBy: order.orderedBy,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod,
          salesTax: order.salesTax,
          revenue: order.revenue,
          vatRate: order.vatRate,
          vat: order.vat,
          origin: order.origin,
          allowOriginSalesTax: order.allowOriginSalesTax,
          implementSalesTaxCollection: order.implementSalesTaxCollection,
          isVatable: order.isVatable,
          deliveryStatus: order.deliveryStatus,
          deliveryMode: order.deliveryMode,
          daysToDelivery: order.daysToDelivery,
          recipientCountryName: order.recipientCountryName,
          recipientStateName: order.recipientStateName,
          recipientCityName: order.recipientCityName,
          shopType: order.shopType,
          stockAvailabilityStatus: order.stockAvailabilityStatus,
          availabilityComment: order.availabilityComment,
          packagingReadinessStatus: order.packagingReadinessStatus,
        });
      });
      setOrderList(allData);
      //setCurrencyName(allData[0].currency.name.toLowerCase());

      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateOrderListCounter,
    updateEdittedOrderListCounter,
    updateOrderListPackageReadinessCounter,
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

  const renderOrderListUpdateCounter = () => {
    setUpdateOrderListCounter((prevState) => !prevState);
  };

  const renderOrderListUpdateUpdateCounter = () => {
    setUpdateOrderListPackageReadinessCounter((prevState) => !prevState);
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
        field: "dateOrdered",
        headerName: "Ordered Date",
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
        field: "stockAvailabilityStatus",
        headerName: "Stock Availability Status",
        width: 250,

        //editable: true,
      },
      {
        field: "packagingReadinessStatus",
        headerName: "Packaging Readiness Status",
        width: 200,

        //editable: true,
      },

      {
        field: "shopType",
        headerName: "Transaction Platform",
        width: 150,

        //editable: true,
      },
      {
        field: "productName",
        headerName: "Product Name",
        width: 150,

        //editable: true,
      },
      {
        field: "sku",
        headerName: "Sku",
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
        field: "orderedQuantity",
        headerName: `Ordered Quantity`,
        width: 180,

        //editable: true,
      },
    ];

    orderList.map((order, index) => {
      console.log("order is:", order.transaction.orderNumber);
      let row = {
        numbering: ++counter,
        id: order.id,
        dateOrdered: order.dateOrdered
          ? new Date(order.dateOrdered).toLocaleDateString()
          : "",
        // status: order.status.replace(
        //   /(^\w|\s\w)(\S*)/g,
        //   (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        // ),
        shopType: order.shopType.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        deliveryStatus: order.deliveryStatus.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        deliveryMode: order.deliveryMode.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),

        orderNumber: order.orderNumber.toUpperCase(),
        cartId: order.cartId,
        transaction: order.transaction,
        transactionNumber: order.transaction.orderNumber,
        transactionId: order.transaction.id,
        product: order.product,
        productName: order.product.name,
        sku: order.product.sku,
        productCategory: order.productCategory,
        productVendor: order.productVendor,
        quantityAdddedToCart: order.quantityAdddedToCart,
        orderedQuantity: order.orderedQuantity,
        orderedPrice: order.orderedPrice,
        currency: order.currency,
        currencyName: order.currency.name,
        customerName: order.customerName,
        customerPhoneNumber: order.customerPhoneNumber,
        customerEmailAddress: order.customerEmailAddress,
        recipientName: order.recipientName,
        recipientPhoneNumber: order.recipientPhoneNumber,
        recipientEmailAddress: order.recipientEmailAddress,
        recipientAddress: order.recipientAddress,
        postalCode: order.postalCode,
        nearestBusstop: order.nearestBusstop,
        recipientCountry: order.recipientCountry,
        recipientState: order.recipientState,
        recipientCity: order.recipientCity,
        dateAddedToCart: order.dateAddedToCart,

        orderedBy: order.orderedBy,

        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        salesTax: order.salesTax,
        revenue: order.revenue,
        vatRate: order.vatRate,
        vat: order.vat,
        origin: order.origin,
        allowOriginSalesTax: order.allowOriginSalesTax,
        implementSalesTaxCollection: order.implementSalesTaxCollection,
        isVatable: order.isVatable,

        daysToDelivery: order.daysToDelivery,
        recipientCountryName: order.recipientCountryName,

        recipientStateName: order.recipientStateName,
        recipientCityName: order.recipientCityName,

        stockAvailabilityStatus: order.stockAvailabilityStatus,

        availabilityComment: order.availabilityComment,
        packagingReadinessStatus: order.packagingReadinessStatus,
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
            <Grid item xs={5.5}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h5">Pending Orders List</Typography>
            </Grid>
            <Grid item xs={6.5}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Confirm Stock Availability Status
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <ConfirmStockAvailabilityForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderOrderListUpdateCounter={
                          renderOrderListUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleEditOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Update Packaging Readiness Status
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditOpen(false)]}
                  >
                    <DialogContent>
                      <UpdatePackageReadinessForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleFailedSnackbar={handleFailedSnackbar}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        renderOrderListUpdateUpdateCounter={
                          renderOrderListUpdateUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>

                  {/* <Button variant="contained" onClick={handleDeleteOpen}>
                    Update Packaging Readiness Status
                  </Button> */}
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

export default OrderList;
