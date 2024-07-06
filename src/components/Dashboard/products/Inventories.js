import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RedeemIcon from "@mui/icons-material/Redeem";
import Divider from "@mui/material/Divider";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
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

function Inventories(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [inventory, setInventory] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [rowSelected, setRowSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/inventories`);
      const workingData = response.data.data.data;
      workingData.map((inventory) => {
        allData.push({
          id: inventory._id,
          product: inventory.product,
          location: inventory.location,
          batchNumber: inventory.batchNumber,
          quantity: inventory.quantity,
          remainingQuantity: inventory.remainingQuantity,
          costPerUnit: inventory.costPerUnit,
          sku: inventory.sku,
          barcode: inventory.barcode,
          source: inventory.source,
          dateOnBoarded: inventory.dateOnBoarded,
          onBoardedBy: inventory.onBoardedBy,
          batchStatus: inventory.batchStatus,
          comment: inventory.comment,
          dateWhenFirstItemWasOffBoarded:
            inventory.dateWhenFirstItemWasOffBoarded,
          dateWhenLastItemWasOffBoarded:
            inventory.dateWhenLastItemWasOffBoarded,
          weightPerUnit: inventory.weightPerUnit,
          configuration: inventory.configuration,
          slug: inventory.slug,
          thisPriceLabel: inventory.thisPriceLabel,
          currentProductPricePerUnit: inventory.currentProductPricePerUnit,
          unit: inventory.unit,
          supplier: inventory.supplier,
          batchNumber: inventory.batchNumber,
        });
      });
      setInventoryList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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
      // { field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 100,
      },
      {
        field: "batchNumber",
        headerName: "Batch Number",
        width: 200,

        //editable: true,
      },
      {
        field: "batchStatus",
        headerName: "Batch Status",
        width: 150,

        //editable: true,
      },
      {
        field: "locationName",
        headerName: "Location",
        width: 250,

        //editable: true,
      },
      {
        field: "productName",
        headerName: "Product",
        width: 250,

        //editable: true,
      },
      {
        field: "quantity",
        headerName: "Quantity OnBoarded",
        width: 150,

        //editable: true,
      },
      {
        field: "remainingQuantity",
        headerName: "Remaining Quantity",
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
        field: "barcode",
        headerName: "Barcode",
        width: 150,

        //editable: true,
      },
      {
        field: "supplierName",
        headerName: "Supplier Name",
        width: 150,

        //editable: true,
      },
      {
        field: "dateOnBoarded",
        headerName: "Date Onboarded",
        width: 150,

        //editable: true,
      },
    ];

    inventoryList.map((inventory, index) => {
      let row = {
        numbering: ++counter,
        id: inventory.id,
        productName: inventory.product.name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        batchNumber: inventory.batchNumber.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        sku: inventory.sku.toUpperCase(),
        barcode: inventory.barcode.toUpperCase(),
        locationName: inventory.location.name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        product: inventory.product,
        location: inventory.location,
        supplier: inventory.supplier,
        quantity: inventory.quantity,
        remainingQuantity: inventory.remainingQuantity,
        costPerUnit: inventory.costPerUnit,
        source: inventory.source,
        dateOnBoarded: inventory.dateOnBoarded
          ? new Date(inventory.dateOnBoarded).toLocaleDateString()
          : "",
        onBoardedBy: inventory.onBoardedBy,
        batchStatus: inventory.batchStatus,
        comment: inventory.comment,
        dateWhenFirstItemWasOffBoarded:
          inventory.dateWhenFirstItemWasOffBoarded,
        dateWhenLastItemWasOffBoarded: inventory.dateWhenLastItemWasOffBoarded,
        weightPerUnit: inventory.weightPerUnit,
        configuration: inventory.configuration,
        slug: inventory.slug,
        thisPriceLabel: inventory.thisPriceLabel,
        currentProductPricePerUnit: inventory.currentProductPricePerUnit,
        unit: inventory.unit,
        supplier: inventory.supplier,
        supplierName: inventory.supplier.name,
        batchNumber: inventory.batchNumber,
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
            <Grid item xs={8.5}>
              <Typography variant="h4">Inventories</Typography>
            </Grid>

            <Grid item xs={3.5}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Adjustment
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Remediate
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Delist
                  </Button>
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
      </Grid>
    </Box>
  );
}

export default Inventories;
