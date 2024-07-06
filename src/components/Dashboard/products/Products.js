import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import Stack from "@mui/material/Stack";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { styled } from "@mui/material/styles";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import ProductForm from "./ProductForm";
import ProductDeleteForm from "./ProductDeleteForm";
import ProductEditForm from "./ProductEditForm";
import OnboardProductBatchForm from "./OnboardProductBatchForm";

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

function Products(props) {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [onBoardOpen, setOnBoardOpen] = useState(false);
  const [communitySalesOpen, setCommunitySalesOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [updateProductCounter, setUpdateProductCounter] = useState(false);
  const [updateEdittedProductCounter, setUpdateEdittedProductCounter] =
    useState(false);
  const [updateDeletedProductCounter, setUpdateDeletedProductCounter] =
    useState(false);
  const [updateOnBoardProductCounter, setUpdateOnBoardProductCounter] =
    useState(false);
  const [
    updateCommunitySalesProductCounter,
    setUpdateCommunitySalesProductCounter,
  ] = useState(false);
  const [productsList, setProductsList] = useState([]);
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
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products`);
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          name: product.name,
          category: product.category,
          configuration: product.configuration,
          shortDescription: product.shortDescription,
          fullDescription: product.fullDescription,
          imageCover: product.imageCover,
          images: product.images,
          currency: product.currency,
          minimumQuantity: product.minimumQuantity,
          keyword1: product.keyword1,
          keyword2: product.keyword2,
          keyword3: product.keyword3,
          pricePerUnit: product.pricePerUnit,
          priceLabel: product.priceLabel,
          isFeaturedProduct: product.isFeaturedProduct,
          displayOnStore: product.displayOnStore,
          stockStatus: product.stockStatus,
          brand: product.brand,
          salesPreference: product.salesPreference,
          allowSubscription: product.allowSubscription,
          slug: product.slug,
          pricingMechanism: product.pricingMechanism,
          isVatable: product.isVatable,
          hasVariant: product.hasVariant,
          sku: product.sku,
          barcode: product.barcode,
          weightPerUnit: product.weightPerUnit,
          unit: product.unit,
          marketPricingCondition: product.marketPricingCondition,
          deliverability: product.deliverability,
          pickupInfo: product.pickupInfo,
          allowPriceFreezing: product.allowPriceFreezing,
          allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
          freezedPriceLowBound: product.freezedPriceLowBound,
          chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
            product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
          chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
            product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
          freezedPriceMaximumDurationInWeeks:
            product.freezedPriceMaximumDurationInWeeks,
          minimumFreezableQuantity: product.minimumFreezableQuantity,
          requiredMaximumNumberOfCommunityMembers:
            product.requiredMaximumNumberOfCommunityMembers,
          communityTotalPurchaseableUnit:
            product.communityTotalPurchaseableUnit,
          communityDeliveryPeriod: product.communityDeliveryPeriod,
          communityDeliveryType: product.communityDeliveryType,
          communityInstruction: product.communityInstruction,
          dealCode: product.dealCode,
          dealExpiryDate: product.dealExpiryDate,

          dealType: product.dealType,
          showDealPricePerUnit: product.showDealPricePerUnit,
          allowDealQuantityChange: product.allowDealQuantityChange,
          dealStatus: product.dealStatus,
          dealComment: product.dealComment,
          productType: product.productType,
          dealDeliveryMode: product.dealDeliveryMode,
          dealCentralizedDeliveryLocation:
            product.dealCentralizedDeliveryLocation,
          dealCentralizedAgreedDeliveryCost:
            product.dealCentralizedAgreedDeliveryCost,
          dealDecentralizedDeliveryLocation:
            product.dealDecentralizedDeliveryLocation,
          dealDecentralizedAgreedDeliveryCost:
            product.dealDecentralizedAgreedDeliveryCost,
          showDealDeliveryCost: product.showDealDeliveryCost,
          dealDeliveryMode: product.dealDeliveryMode,
          dealPaymentPreference: product.dealPaymentPreference,
          showDealPaymentDetails: product.showDealPaymentDetails,
          requestDealRedemptionCode: product.requestDealRedemptionCode,
          isAContributoryDeal: product.isAContributoryDeal,
          dealOwner: product.dealOwner,
          dealOwnerEntity: product.dealOwnerEntity,
          dealInitialPercentageContribution:
            product.dealInitialPercentageContribution,
          dealMaximumInstallmentAllowed: product.dealMaximumInstallmentAllowed,
          includeGatewayChargesInPrice: product.includeGatewayChargesInPrice,
          gatewayFixedCharge: product.gatewayFixedCharge,
          gatewayRateCharge: product.gatewayRateCharge,
          isACreditDeal: product.isACreditDeal,
        });
      });
      setProductsList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateProductCounter,
    updateEdittedProductCounter,
    updateDeletedProductCounter,
    updateOnBoardProductCounter,
    updateCommunitySalesProductCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderProductUpdateCounter = () => {
    setUpdateProductCounter((prevState) => !prevState);
  };

  const renderProductEdittedUpdateCounter = () => {
    setUpdateEdittedProductCounter((prevState) => !prevState);
  };

  const renderProductDeletedUpdateCounter = () => {
    setUpdateDeletedProductCounter((prevState) => !prevState);
  };

  const renderProductCommunitySalesUpdateCounter = () => {
    setUpdateCommunitySalesProductCounter((prevState) => !prevState);
  };

  const renderProductOnBoardUpdateCounter = () => {
    setUpdateOnBoardProductCounter((prevState) => !prevState);
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

  const handleSuccessfulOnBoardItemSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleSuccessfulCommunitySalesItemSnackbar = (message) => {
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

  const handleOnBoardDialogOpenStatus = () => {
    setOnBoardOpen(false);
  };

  const handleDeleteDialogOpenStatus = () => {
    setDeleteOpen(false);
  };

  const handleCommunitySalesDialogOpenStatus = () => {
    setCommunitySalesOpen(false);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleOnBoardOpen = () => {
    setOnBoardOpen(true);
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
        width: 80,
      },
      {
        field: "name",
        headerName: "Product Name",
        width: 250,

        //editable: true,
      },
      {
        field: "brand",
        headerName: "Product Brand",
        width: 250,

        //editable: true,
      },
      {
        field: "category",
        headerName: "Category",
        width: 180,

        //editable: true,
      },
      {
        field: "configuration",
        headerName: "Configuration",
        width: 180,

        //editable: true,
      },
      {
        field: "stockStatus",
        headerName: "Stock Status",
        width: 180,

        //editable: true,
      },
      {
        field: "pricePerUnit",
        headerName: "Price per Unit",
        width: 180,

        //editable: true,
      },
      {
        field: "displayOnStore",
        headerName: "Display On Store",
        width: 180,

        //editable: true,
      },
    ];

    productsList.map((product, index) => {
      console.log("products:", product);
      let row = {
        numbering: ++counter,
        id: product.id,
        name: product.name
          ? product.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        category: product.category[0].name
          ? product.category[0].name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        configuration: product.configuration
          ? product.configuration.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        marketPricingCondition: product.marketPricingCondition
          ? product.marketPricingCondition.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",

        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        imageCover: product.imageCover,
        images: product.images,
        currency: product.currency,
        minimumQuantity: product.minimumQuantity,
        keyword1: product.keyword1,
        keyword2: product.keyword2,
        keyword3: product.keyword3,
        pricePerUnit: product.pricePerUnit,
        priceLabel: product.priceLabel,
        isFeaturedProduct: product.isFeaturedProduct,
        displayOnStore: product.displayOnStore,
        stockStatus: product.stockStatus,
        brand: product.brand,
        salesPreference: product.salesPreference,
        allowSubscription: product.allowSubscription,
        slug: product.slug,
        pricingMechanism: product.pricingMechanism,
        isVatable: product.isVatable,
        hasVariant: product.hasVariant,
        sku: product.sku,
        barcode: product.barcode,
        weightPerUnit: product.weightPerUnit,
        unit: product.unit,
        categoryId: product.category[0].id,
        deliverability: product.deliverability,
        pickupInfo: product.pickupInfo,
        allowPriceFreezing: product.allowPriceFreezing,
        allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
        freezedPriceLowBound: product.freezedPriceLowBound,
        chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
          product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
        chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
          product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
        freezedPriceMaximumDurationInWeeks:
          product.freezedPriceMaximumDurationInWeeks,
        minimumFreezableQuantity: product.minimumFreezableQuantity,
        requiredMaximumNumberOfCommunityMembers:
          product.requiredMaximumNumberOfCommunityMembers,
        communityTotalPurchaseableUnit: product.communityTotalPurchaseableUnit,
        communityDeliveryPeriod: product.communityDeliveryPeriod,
        communityDeliveryType: product.communityDeliveryType,
        communityInstruction: product.communityInstruction,
        dealCode: product.dealCode,
        dealExpiryDate: product.dealExpiryDate,
        dealType: product.dealType,
        showDealPricePerUnit: product.showDealPricePerUnit,
        allowDealQuantityChange: product.allowDealQuantityChange,
        dealStatus: product.dealStatus,
        dealComment: product.dealComment,
        productType: product.productType,
        dealDeliveryMode: product.dealDeliveryMode,
        dealCentralizedDeliveryLocation:
          product.dealCentralizedDeliveryLocation,
        dealCentralizedAgreedDeliveryCost:
          product.dealCentralizedAgreedDeliveryCost,
        dealDecentralizedDeliveryLocation:
          product.dealDecentralizedDeliveryLocation,
        dealDecentralizedAgreedDeliveryCost:
          product.dealDecentralizedAgreedDeliveryCost,
        showDealDeliveryCost: product.showDealDeliveryCost,
        dealDeliveryMode: product.dealDeliveryMode,
        dealPaymentPreference: product.dealPaymentPreference,
        showDealPaymentDetails: product.showDealPaymentDetails,
        requestDealRedemptionCode: product.requestDealRedemptionCode,
        isAContributoryDeal: product.isAContributoryDeal,
        dealOwner: product.dealOwner,
        dealOwnerEntity: product.dealOwnerEntity,
        dealInitialPercentageContribution:
          product.dealInitialPercentageContribution,
        dealMaximumInstallmentAllowed: product.dealMaximumInstallmentAllowed,
        includeGatewayChargesInPrice: product.includeGatewayChargesInPrice,
        gatewayFixedCharge: product.gatewayFixedCharge,
        gatewayRateCharge: product.gatewayRateCharge,
        isACreditDeal: product.isACreditDeal,
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
            <Grid item xs={8}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Products</Typography>
            </Grid>
            <Grid item xs={4}>
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
                      <ProductForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductUpdateCounter={renderProductUpdateCounter}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleEditOpen}
                    disabled={rowSelected ? false : true}
                  >
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
                      <ProductEditForm
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
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleOnBoardOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Onboard
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={onBoardOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOnBoardOpen(false)]}
                  >
                    <DialogContent>
                      <OnboardProductBatchForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleOnBoardDialogOpenStatus={
                          handleOnBoardDialogOpenStatus
                        }
                        handleSuccessfulOnBoardItemSnackbar={
                          handleSuccessfulOnBoardItemSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductOnBoardUpdateCounter={
                          renderProductOnBoardUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="contained"
                    onClick={handleDeleteOpen}
                    disabled={rowSelected ? false : true}
                  >
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
                      <ProductDeleteForm
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
                      />
                    </DialogContent>
                  </Dialog>
                  {/* <Button
                    variant="contained"
                    onClick={handleDeleteOpen}
                    disabled={rowSelected ? false : true}
                  >
                    Create Community Deal
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={communitySalesOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setCommunitySalesOpen(false)]}
                  >
                    <DialogContent>
                      <ProductDeleteForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleCommunitySalesDialogOpenStatus={
                          handleCommunitySalesDialogOpenStatus
                        }
                        handleSuccessfulCommunitySalesItemSnackbar={
                          handleSuccessfulCommunitySalesItemSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductCommunitySalesUpdateCounter={
                          renderProductCommunitySalesUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog> */}
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

export default Products;
