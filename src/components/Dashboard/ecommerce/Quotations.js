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
import RequestedQuoteForm from "./RequestedQuoteForm";

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

function Quotations(props) {
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
  const [rowSelected, setRowSelected] = useState(false);
  const [rowNumber, setRowNumber] = useState(0);
  const [
    updateRequestedQuoteStatusCounter,
    setUpdateRequestedQuoteStatusCounter,
  ] = useState(false);
  const [quotesList, setQuotesList] = useState([]);
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
      const response = await api.get(`/quotes`, {
        params: { status: "pending" },
      });
      const workingData = response.data.data.data;
      workingData.map((quote) => {
        allData.push({
          id: quote._id,
          quoteRequestNumber: quote.quoteRequestNumber,
          customerName: quote.customerName,
          product: quote.product,
          productName: quote.productName,
          sku: quote.sku,
          quantityRequested: quote.quantityRequested,
          minimumOrderQuantity: quote.minimumOrderQuantity,
          whatsappNumber: quote.whatsappNumber,
          customerEmail: quote.customerEmail,
          deliveryPreference: quote.deliveryPreference,
          country: quote.country,
          state: quote.state,
          city: quote.city,
          address: quote.address,
          status: quote.status,
          timeToLiveInHours: quote.timeToLiveInHours,
          addToWhatsappGroup: quote.addToWhatsappGroup,
          addToEmailList: quote.addToEmailList,
          dateRequested: quote.dateRequested,
          comment: quote.comment,
        });
      });
      setQuotesList(allData);
      //setCurrencyName(allData[0].currency.name.toLowerCase());

      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateRequestedQuoteStatusCounter]);

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

  const renderRequestedQuoteStatusUpdateCounter = () => {
    setUpdateRequestedQuoteStatusCounter((prevState) => !prevState);
  };

  const handleEditDialogOpenStatus = () => {
    setEditOpen(false);
  };

  const handleDeleteDialogOpenStatus = () => {
    setDeleteOpen(false);
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
        field: "dateRequested",
        headerName: "Date Requested",
        width: 150,

        //editable: true,
      },
      {
        field: "quoteRequestNumber",
        headerName: "Quotation Request Number",
        width: 220,

        //editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,

        //editable: true,
      },
      {
        field: "deliveryPreference",
        headerName: `Delivery Preference`,
        width: 150,

        //editable: true,
      },
      {
        field: "quantityRequested",
        headerName: "Quantity Requested",
        width: 150,

        //editable: true,
      },

      {
        field: "minimumOrderQuantity",
        headerName: "Minimum Quantity Required",
        width: 150,

        //editable: true,
      },

      {
        field: "addToWhatsappGroup",
        headerName: "Add To Whatsapp Group?",
        width: 180,

        //editable: true,
      },
      {
        field: "addToEmailList",
        headerName: "Add To Email List",
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

    quotesList.map((quote, index) => {
      let row = {
        numbering: ++counter,

        id: quote.id,
        quoteRequestNumber: quote.quoteRequestNumber,
        customerName: quote.customerName,
        product: quote.product,
        productName: quote.productName,
        sku: quote.sku,
        quantityRequested: quote.quantityRequested,
        minimumOrderQuantity: quote.minimumOrderQuantity,
        whatsappNumber: quote.whatsappNumber,
        customerEmail: quote.customerEmail,
        deliveryPreference: quote.deliveryPreference,
        country: quote.country,
        countryName: quote.country ? quote.country.name : null,
        state: quote.state,
        stateName: quote.state ? quote.state.name : null,
        city: quote.city,
        cityName: quote.city ? quote.city.name : null,
        address: quote.address,
        status: quote.status,
        configuration: quote.product.configuration,
        timeToLiveInHours: quote.timeToLiveInHours,
        addToWhatsappGroup: quote.addToWhatsappGroup,
        addToEmailList: quote.addToEmailList,
        comment: quote.comment,
        dateRequested: quote.dateRequested
          ? new Date(quote.dateRequested).toLocaleDateString()
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
            <Grid item xs={9.4}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h5">Pending Quotations List</Typography>
            </Grid>
            <Grid item xs={2.6}>
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
                      <RequestedQuoteForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderRequestedQuoteStatusUpdateCounter={
                          renderRequestedQuoteStatusUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Update Quotation Status
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
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

                  {/* <Button variant="contained" onClick={handleDeleteOpen}>
                    Reject Transaction
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

export default Quotations;
