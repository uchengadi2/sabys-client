import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
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
import AddCarrierForm from "./AddCarrierForm";
import CarrierDeleteForm from "./CarrierDeleteForm";
import CarrierEditForm from "./CarrierEditForm";

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

function Carriers(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [updateCarrierCounter, setUpdateCarrierCounter] = useState(false);
  const [updateEdittedCarrierCounter, setUpdateEdittedCarrierCounter] =
    useState(false);
  const [updateDeletedCarrierCounter, setUpdateDeletedCarrierCounter] =
    useState(false);
  const [carrierList, setCarrierList] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
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
      const response = await api.get(`/carriers`);
      const workingData = response.data.data.data;
      workingData.map((carrier) => {
        allData.push({
          id: carrier._id,
          name: carrier.name,
          carrierNumber: carrier.carrierNumber,
          carrierType: carrier.carrierType,
          description: carrier.description,
          country: carrier.country,
          state: carrier.state,
          address: carrier.address,
          contactPerson: carrier.contactPerson,
          contactPersonEmail: carrier.contactPersonEmail,
          contactPhoneNumbers: carrier.contactPhoneNumbers,
          vehicleTypes: carrier.vehicleTypes,
          bankDetails: carrier.bankDetails,
          countryId: carrier.country,
          stateId: carrier.state,
          vehicles: carrier.vehicles,
        });
      });
      setCarrierList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateCarrierCounter,
    updateEdittedCarrierCounter,
    updateDeletedCarrierCounter,
  ]);

  console.log("carrier:", carrierList);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderCarrierUpdateCounter = () => {
    setUpdateCarrierCounter((prevState) => !prevState);
  };

  const renderCarrierEdittedUpdateCounter = () => {
    setUpdateEdittedCarrierCounter((prevState) => !prevState);
  };

  const renderCarrierDeletedUpdateCounter = () => {
    setUpdateDeletedCarrierCounter((prevState) => !prevState);
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
        field: "name",
        headerName: "Carrier Name",
        width: 350,

        //editable: true,
      },
      {
        field: "carrierNumber",
        headerName: "Carrier Number",
        width: 150,
        //editable: true,
      },
      {
        field: "carrierType",
        headerName: "Carrier Type",
        //type: "number",
        width: 150,
        //editable: true,
      },

      {
        field: "address",
        headerName: "Address",
        sortable: false,
        width: 250,
      },
      {
        field: "country",
        headerName: "Country",
        sortable: false,
        width: 250,
      },
    ];

    carrierList.map((carrier, index) => {
      let row = {
        numbering: ++counter,
        id: carrier.id,
        carrierNumber: carrier.carrierNumber,
        carrierType: carrier.carrierType
          ? carrier.carrierType.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        name: carrier.name
          ? carrier.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",

        address: carrier.address
          ? carrier.address.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",

        country: carrier.country[0].name
          ? carrier.country[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        description: carrier.description,
        contactPerson: carrier.contactPerson,
        contactPersonEmail: carrier.contactPersonEmail,
        contactPhoneNumbers: carrier.contactPhoneNumbers,
        vehicles: carrier.vehicles,
        bankDetails: carrier.bankDetails,
        countryId: carrier.country[0].id,
        stateId: carrier.state,
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
            <Grid item xs={9.3}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Carriers</Typography>
            </Grid>
            <Grid item xs={2.7}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleAddOpen}>
                    Add
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <AddCarrierForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCarrierUpdateCounter={renderCarrierUpdateCounter}
                        renderCarrierEdittedUpdateCounter={
                          renderCarrierEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleEditOpen}>
                    Edit
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditOpen(false)]}
                  >
                    <DialogContent>
                      <CarrierEditForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCarrierEdittedUpdateCounter={
                          renderCarrierEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleDeleteOpen}>
                    Delete
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <CarrierDeleteForm
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
                        renderCarrierDeletedUpdateCounter={
                          renderCarrierDeletedUpdateCounter
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

export default Carriers;
