import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Snackbar from "@material-ui/core/Snackbar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import AddShipRateForm from "./AddShipRateForm";

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

function ShippingRates(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cityShipRateList, setCityShipRateList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [rowSelected, setRowSelected] = useState(false);
  const [updateShippingRateCounter, setUpdateShippingRateCounter] =
    useState(false);
  const [
    updateEdittedShippingRateCounter,
    setUpdateEdittedShippingRateCounter,
  ] = useState(false);
  const [
    updateDeletedShippingRateCounter,
    setUpdateDeletedShippingRateCounter,
  ] = useState(false);
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
      const response = await api.get(`/cities`);
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({
          id: city._id,
          name: city.name,
          country: city.country,
          state: city.state,
          code: city.code,
          description: city.description,
          baseDeliveryWeight: city.baseDeliveryWeight,
          daysToStandardDelivery: city.daysToStandardDelivery,
          daysToPriorityDelivery: city.daysToPriorityDelivery,
          daysToSameDayDelivery: city.daysToSameDayDelivery,
          baseDeliveryStandardRate: city.baseDeliveryStandardRate,
          baseDeliveryPriorityRate: city.baseDeliveryPriorityRate,
          baseDeliverySameDayRate: city.baseDeliverySameDayRate,
          extraKgDeliveryStandardRate: city.extraKgDeliveryStandardRate,
          extraKgDeliveryPriorityRate: city.extraKgDeliveryPriorityRate,
          extraKgDeliverySameDayRate: city.extraKgDeliverySameDayRate,
          allowPayOnDelivery: city.allowPayOnDelivery,
          payOnDeliveryMaxWeightInKg: city.payOnDeliveryMaxWeightInKg,
          allowSameDayDelivery: city.allowSameDayDelivery,
          allowStandardDelivery: city.allowStandardDelivery,
          allowPriorityDelivery: city.allowPriorityDelivery,
          allowPickUpDelivery: city.allowPickUpDelivery,
          placeType: city.placeType,
        });
      });
      setCityShipRateList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateShippingRateCounter,
    updateEdittedShippingRateCounter,
    updateDeletedShippingRateCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderShiipingRateUpdateCounter = () => {
    setUpdateShippingRateCounter((prevState) => !prevState);
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

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddOpen = () => {
    setOpen(true);
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

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
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

  const renderDataGrid = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      //{ field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 100,
      },
      {
        field: "name",
        headerName: "Name",
        width: 150,

        //editable: true,
      },
      {
        field: "stateName",
        headerName: "State",
        width: 150,
        //editable: true,
      },
      {
        field: "countryName",
        headerName: "Country",
        sortable: false,
        width: 200,
        // valueGetter: (params) =>
        //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      },
      // {
      //   field: "code",
      //   headerName: "Code",
      //   width: 150,
      //   //editable: true,
      // },
      {
        field: "baseDeliveryWeight",
        headerName: "Base Delivery Weight",
        width: 150,
        //editable: true,
      },
      {
        field: "daysToStandardDelivery",
        headerName: "Days To Standard Delivery",
        width: 150,
        //editable: true,
      },
      {
        field: "daysToPriorityDelivery",
        headerName: "Days To Priority Delivery",
        width: 150,
        //editable: true,
      },
      {
        field: "daysToSameDayDelivery",
        headerName: "Days To Same Day Delivery",
        width: 150,
        //editable: true,
      },
      {
        field: "baseDeliveryStandardRate",
        headerName: "Base Delivery Standard Rate",
        width: 150,
        //editable: true,
      },
      {
        field: "baseDeliveryPriorityRate",
        headerName: "Base Delivery Priority Rate",
        width: 150,
        //editable: true,
      },
      {
        field: "baseDeliverySameDayRate",
        headerName: "Base Delivery Same Day Rate",
        width: 150,
        //editable: true,
      },
      {
        field: "extraKgDeliveryStandardRate",
        headerName: "Extra Kg Delivery Standard Rate",
        width: 150,
        //editable: true,
      },
      {
        field: "extraKgDeliveryPriorityRate",
        headerName: "Extra Kg Delivery Priority Rate",
        width: 150,
        //editable: true,
      },
      {
        field: "extraKgDeliverySameDayRate",
        headerName: "Extra Kg Delivery Same Day Rate",
        width: 150,
        //editable: true,
      },
      {
        field: "allowPayOnDelivery",
        headerName: "Allow Pay On Delivery",
        width: 150,
        //editable: true,
      },
      {
        field: "payOnDeliveryMaxWeightInKg",
        headerName: "Pay-On-Delivery Maximum Weight(Kg)",
        width: 150,
        //editable: true,
      },
      {
        field: "allowSameDayDelivery",
        headerName: "Allow Same Day Delivery",
        width: 150,
        //editable: true,
      },
      {
        field: "allowStandardDelivery",
        headerName: "Allow Standard Delivery",
        width: 150,
        //editable: true,
      },
      {
        field: "allowPriorityDelivery",
        headerName: "Allow Priority Delivery",
        width: 150,
        //editable: true,
      },
    ];

    cityShipRateList.map((city, index) => {
      let row = {
        numbering: ++counter,
        id: city.id,
        code: city.code,
        name: city.name
          ? city.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        countryName: city.country[0].name
          ? city.country[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        stateName: city.state[0].name
          ? city.state[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        baseDeliveryWeight: city.baseDeliveryWeight,
        daysToStandardDelivery: city.daysToStandardDelivery,
        daysToPriorityDelivery: city.daysToPriorityDelivery,
        daysToSameDayDelivery: city.daysToSameDayDelivery,
        baseDeliveryStandardRate: city.baseDeliveryStandardRate,
        baseDeliveryPriorityRate: city.baseDeliveryPriorityRate,
        baseDeliverySameDayRate: city.baseDeliverySameDayRate,
        extraKgDeliveryStandardRate: city.extraKgDeliveryStandardRate,
        extraKgDeliveryPriorityRate: city.extraKgDeliveryPriorityRate,
        extraKgDeliverySameDayRate: city.extraKgDeliverySameDayRate,
        allowPayOnDelivery: city.allowPayOnDelivery,
        payOnDeliveryMaxWeightInKg: city.payOnDeliveryMaxWeightInKg,
        allowSameDayDelivery: city.allowSameDayDelivery,
        allowStandardDelivery: city.allowStandardDelivery,
        allowPriorityDelivery: city.allowPriorityDelivery,
        allowPickUpDelivery: city.allowPickUpDelivery,
        placeType: city.placeType,
        description: city.description,
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
            <Grid item xs={9.2}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Shipping/Delivery Rates</Typography>
            </Grid>
            <Grid item xs={2.8}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleEditOpen}
                  disabled={rowSelected ? false : true}
                >
                  Add/Update Shipping Rate
                </Button>
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={editOpen}
                  // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                  onClose={() => [setEditOpen(false)]}
                >
                  <DialogContent>
                    <AddShipRateForm
                      params={selectedRows}
                      handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                      handleSuccessfulEditSnackbar={
                        handleSuccessfulEditSnackbar
                      }
                      handleFailedSnackbar={handleFailedSnackbar}
                      renderShiipingRateUpdateCounter={
                        renderShiipingRateUpdateCounter
                      }
                    />
                  </DialogContent>
                </Dialog>
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

export default ShippingRates;
