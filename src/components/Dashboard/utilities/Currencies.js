import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@mui/material/Typography";
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
import AddCurrencyForm from "./AddCurrencyForm";
import CurrencyEditForm from "./CurrencyEditForm";
import CurrencyDeleteForm from "./CurrencyDeleteForm";

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

function Currencies(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [updateCurrencyCounter, setUpdateCurrencyCounter] = useState(false);
  const [updateEdittedCurrencyCounter, setUpdateEdittedCurrencyCounter] =
    useState(false);
  const [updateDeletedCurrencyCounter, setUpdateDeletedCurrencyCounter] =
    useState(false);
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
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
      const response = await api.get(`/currencies`);
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({
          id: currency._id,
          name: currency.name,
          country: currency.country,
          code: currency.code,
          symbol: currency.symbol,
          description: currency.description,
        });
      });
      setCurrencyList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateCurrencyCounter,
    updateEdittedCurrencyCounter,
    updateDeletedCurrencyCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderCurrencyUpdateCounter = () => {
    setUpdateCurrencyCounter((prevState) => !prevState);
  };

  const renderCurrencyEdittedUpdateCounter = () => {
    setUpdateEdittedCurrencyCounter((prevState) => !prevState);
  };

  const renderCurrencyDeletedUpdateCounter = () => {
    setUpdateDeletedCurrencyCounter((prevState) => !prevState);
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
      //{ field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 100,
      },
      {
        field: "name",
        headerName: "Name",
        width: 250,

        //editable: true,
      },

      {
        field: "country",
        headerName: "Country",
        sortable: false,
        width: 250,
        // valueGetter: (params) =>
        //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      },
      {
        field: "code",
        headerName: "Code",
        width: 150,
        //editable: true,
      },
    ];

    currencyList.map((currency, index) => {
      let row = {
        numbering: ++counter,
        id: currency.id,
        code: currency.code,
        name: currency.name
          ? currency.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        country: currency.country[0].name
          ? currency.country[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        description: currency.description,
        symbol: currency.symbol,
        countryId: currency.country[0].id,
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
              <Typography variant="h4">Currencies</Typography>
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
                      <AddCurrencyForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCurrencyUpdateCounter={
                          renderCurrencyUpdateCounter
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
                      <CurrencyEditForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCurrencyEdittedUpdateCounter={
                          renderCurrencyEdittedUpdateCounter
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
                      <CurrencyDeleteForm
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
                        renderCurrencyDeletedUpdateCounter={
                          renderCurrencyDeletedUpdateCounter
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

export default Currencies;
