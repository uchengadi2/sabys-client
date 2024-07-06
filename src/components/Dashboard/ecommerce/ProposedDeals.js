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
import api from "../../../apis/local";
import RequestedQuoteForm from "./RequestedQuoteForm";
import ProposedDealStatusForm from "./ProposedDealStatusForm";

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

function ProposedDeals(props) {
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
  const [updateProposedDealStatusCounter, setUpdateProposedDealStatusCounter] =
    useState(false);
  const [quotesList, setQuotesList] = useState([]);
  const [dealsList, setDealsList] = useState([]);
  const [currencyName, setCurrencyName] = useState("naira");
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
      const response = await api.get(`/deals`, {
        params: { status: "pending" },
      });
      const workingData = response.data.data.data;
      workingData.map((deal) => {
        allData.push({
          id: deal._id,
          proposedDealCode: deal.proposedDealCode,
          product: deal.product,
          productSku: deal.productSku,
          productName: deal.productName,
          productMinimumOrderQuantity: deal.productMinimumOrderQuantity,
          productSalesPreference: deal.productSalesPreference,
          productConfiguration: deal.productConfiguration,
          productPriceLabel: deal.productPriceLabel,
          productPricePerUnit: deal.productPricePerUnit,
          productWeightPerUnit: deal.productWeightPerUnit,
          productUnit: deal.productUnit,
          proposedQuantity: deal.proposedQuantity,
          proposedPricePerUnit: deal.proposedPricePerUnit,
          customerName: deal.customerName,
          customerPhoneNumber: deal.customerPhoneNumber,
          customerEmailAddress: deal.customerEmailAddress,
          status: deal.status,
          dateProposed: deal.dateProposed,
          proposedDayToDelivery: deal.proposedDayToDelivery,
          comment: deal.comment,
          proposedDeliveryPreference: deal.proposedDeliveryPreference,
        });
      });
      setDealsList(allData);
      //setCurrencyName(allData[0].currency.name.toLowerCase());

      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateProposedDealStatusCounter]);

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

  const renderProposedDealStatusUpdateCounter = () => {
    setUpdateProposedDealStatusCounter((prevState) => !prevState);
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
        field: "dateProposed",
        headerName: "Date Proposed",
        width: 150,

        //editable: true,
      },
      {
        field: "proposedDealCode",
        headerName: "Proposed Deal Code",
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
        field: "productName",
        headerName: `Product Name`,
        width: 150,

        //editable: true,
      },
      {
        field: "productSku",
        headerName: `Product Sku`,
        width: 150,

        //editable: true,
      },
      {
        field: "productUnit",
        headerName: `Product Unit`,
        width: 150,

        //editable: true,
      },

      {
        field: "proposedQuantity",
        headerName: "Proposed Quantity",
        width: 150,

        //editable: true,
      },

      {
        field: "proposedPricePerUnit",
        headerName: `Proposed Price Per Unit(${
          getCurrencyCode().props.children
        })`,
        width: 220,

        //editable: true,
      },
      {
        field: "proposedDayToDelivery",
        headerName: "Proposed Day To Delivery",
        width: 220,

        //editable: true,
      },
      {
        field: "productPricePerUnit",
        headerName: `Product Price Per Unit(${
          getCurrencyCode().props.children
        })`,
        width: 200,

        //editable: true,
      },

      {
        field: "customerPhoneNumber",
        headerName: "Customer Phone Number",
        width: 220,

        //editable: true,
      },
      {
        field: "customerName",
        headerName: "Customer Name",
        width: 220,

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

    dealsList.map((deal, index) => {
      let row = {
        numbering: ++counter,

        id: deal.id,
        proposedDealCode: deal.proposedDealCode,
        customerName: deal.customerName,
        product: deal.product,
        productName: deal.productName,
        productSku: deal.productSku,
        productMinimumOrderQuantity: deal.productMinimumOrderQuantity,
        productSalesPreference: deal.productSalesPreference,
        productConfiguration: deal.productConfiguration,
        productPriceLabel: deal.productPriceLabel,
        productPricePerUnit: deal.productPricePerUnit
          ? deal.productPricePerUnit
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : 0,
        productWeightPerUnit: deal.productWeightPerUnit,
        productUnit: deal.productUnit,
        proposedQuantity: deal.proposedQuantity,
        proposedPricePerUnit: deal.proposedPricePerUnit
          ? deal.proposedPricePerUnit
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : 0,
        customerPhoneNumber: deal.customerPhoneNumber,
        customerEmailAddress: deal.customerEmailAddress,
        proposedDeliveryPreference: deal.proposedDeliveryPreference,
        status: deal.status,
        proposedDayToDelivery: deal.proposedDayToDelivery,
        comment: deal.comment,
        dateProposed: deal.dateProposed
          ? new Date(deal.dateProposed).toLocaleDateString()
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
            <Grid item xs={9}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h5">Pending Proposed Deals List</Typography>
            </Grid>
            <Grid item xs={3}>
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
                      <ProposedDealStatusForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProposedDealStatusUpdateCounter={
                          renderProposedDealStatusUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Update Proposed Deal Status
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

export default ProposedDeals;
