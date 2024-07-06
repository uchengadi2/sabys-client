import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import CartUpdateAndDeliveryForm from "./CartUpdateAndDeliveryForm";
import AllCourses from "../homePageCards/AllCourses";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: 440,
    height: "100%",
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  media: {
    // height: 700,
    // width: 350,
    height: "100%",
    width: "100%",
    //padding: 20,
  },
  rootMobile: {
    //maxWidth: 600,
    maxWidth: "100%",
    height: "100%",
    //height: 780,
    //width: 400,
    width: "95%",

    marginLeft: "3px",
    //borderRadius: 30,
    marginTop: "0.2em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    // height: 200,
    // width: 200,
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function CartProductCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState();
  const [currency, setCurrency] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();
  const [price, setPrice] = useState();
  const [minQuantity, setMinQuantity] = useState(1);
  const [course, setCourse] = useState({});

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setPrice(props.product.pricePerUnit);
    setMinQuantity(props.product.minQuantity);
  }, [props]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  //get the product details
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products/${props.product}`);
      const product = response.data.data.data;

      allData.push({
        id: product._id,
        name: product.name,
        imageCover: product.imageCover,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        pricePerUnit: product.pricePerUnit,
        category: product.category,
        minimumQuantity: product.minimumQuantity,
        currency: product.currency,
        unit: product.unit,
        isFeaturedProduct: product.isFeaturedProduct,
        configuration: product.configuration,
        displayOnStore: product.displayOnStore,
        brand: product.brand,
        salesPreference: product.salesPreference,
        keyword1: product.keyword1,
        keyword2: product.keyword2,
        keyword3: product.keyword3,
        slug: product.slug,
        images: product.images,
        sku: product.sku,
        pricingMechanism: product.pricingMechanism,
        priceLabel: product.priceLabel,
        weightPerUnit: product.weightPerUnit,
        stockStatus: product.stockStatus,
        allowSubscription: product.allowSubscription,
        isVatable: product.isVatable,
        hasVariant: product.hasVariant,
        barcode: product.barcode,
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
        datePriceWasSet: product.datePriceWasSet,

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
        dealPaymentPreference: product.dealPaymentPreference,
        showDealPaymentDetails: product.showDealPaymentDetails,
        dealPaymentPreference: product.dealPaymentPreference,
        requestDealRedemptionCode: product.requestDealRedemptionCode,
      });

      if (!allData) {
        return;
      }
      setProduct({
        id: allData[0].id,
        name: allData[0].name,
        image: allData[0].imageCover,
        mainImage: allData[0].image,
        images: allData[0].images,
        shortDescription: allData[0].shortDescription,
        fullDescription: allData[0].fullDescription,
        pricePerUnit: allData[0].pricePerUnit,
        category: allData[0].category,
        minimumQuantity: allData[0].minimumQuantity,
        currency: allData[0].currency,
        unit: allData[0].unit,
        sku: allData[0].sku,
        isFeaturedProduct: allData[0].isFeaturedProduct,
        configuration: allData[0].configuration,
        displayOnStore: allData[0].displayOnStore,
        brand: allData[0].brand,
        salesPreference: allData[0].salesPreference,
        keyword1: allData[0].keyword1,
        keyword2: allData[0].keyword2,
        keyword3: allData[0].keyword3,
        slug: allData[0].slug,
        allowSubscription: allData[0].allowSubscription,
        //video: allData[0].video,
        createBy: allData[0].createBy,
        pricingMechanism: allData[0].pricingMechanism,
        weightPerUnit: allData[0].weightPerUnit,
        isVatable: allData[0].isVatable,
        priceLabel: allData[0].priceLabel,
        stockStatus: allData[0].stockStatus,
        marketPricingCondition: allData[0].marketPricingCondition,
        hasVariant: allData[0].hasVariant,
        barcode: allData[0].barcode,
        deliverability: allData[0].deliverability,
        pickupInfo: allData[0].pickupInfo,

        allowPriceFreezing: allData[0].allowPriceFreezing,
        allowFreezedPriceLowBound: allData[0].allowFreezedPriceLowBound,
        freezedPriceLowBound: allData[0].freezedPriceLowBound,
        chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
          allData[0].chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
        chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
          allData[0].chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
        freezedPriceMaximumDurationInWeeks:
          allData[0].freezedPriceMaximumDurationInWeeks,
        minimumFreezableQuantity: allData[0].minimumFreezableQuantity,
        datePriceWasSet: allData[0].datePriceWasSet,

        requiredMaximumNumberOfCommunityMembers:
          allData[0].requiredMaximumNumberOfCommunityMembers,
        communityTotalPurchaseableUnit:
          allData[0].communityTotalPurchaseableUnit,
        communityDeliveryPeriod: allData[0].communityDeliveryPeriod,
        communityDeliveryType: allData[0].communityDeliveryType,
        communityInstruction: allData[0].communityInstruction,
        dealCode: allData[0].dealCode,
        dealExpiryDate: allData[0].dealExpiryDate,
        dealType: allData[0].dealType,
        showDealPricePerUnit: allData[0].showDealPricePerUnit,
        allowDealQuantityChange: allData[0].allowDealQuantityChange,
        dealStatus: allData[0].dealStatus,
        dealComment: allData[0].dealComment,
        dealDeliveryMode: allData[0].dealDeliveryMode,
        dealCentralizedDeliveryLocation:
          allData[0].dealCentralizedDeliveryLocation,
        dealCentralizedAgreedDeliveryCost:
          allData[0].dealCentralizedAgreedDeliveryCost,
        dealDecentralizedDeliveryLocation:
          allData[0].dealDecentralizedDeliveryLocation,
        dealDecentralizedAgreedDeliveryCost:
          allData[0].dealDecentralizedAgreedDeliveryCost,
        showDealDeliveryCost: allData[0].showDealDeliveryCost,
        dealPaymentPreference: allData[0].dealPaymentPreference,
        showDealPaymentDetails: allData[0].showDealPaymentDetails,
        dealPaymentPreference: allData[0].dealPaymentPreference,
        requestDealRedemptionCode: allData[0].requestDealRedemptionCode,
      });
      setCurrency(allData[0].currency);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.product]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${product.currency}`);
      const currency = response.data.data.data;

      allData.push({
        id: currency._id,
        name: currency.name,
      });
      setCurrencyName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [product.currency, props]);

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${product.image}`;
  }

  const Str = require("@supercharge/strings");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleBookingsOpenDialogStatus = () => {
    setOpen(false);
  };
  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleLoginDialogCloseStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(false);
  };

  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };
  const handleMakeOpenForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(true);
    setOpenLoginForm(false);
  };
  const handleMakeCloseForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(false);
    setOpenLoginForm(false);
  };
  const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    // setOpen({ open: false });
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message,
      backgroundColor: "#FF3232",
    });
    //setOpen({ open: false });
  };

  const renderLoginForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLoginForm}
        //onClose={() => [setOpenLoginForm(false), history.push("/")]}
        onClose={() => [setOpenLoginForm(false)]}
      >
        <DialogContent>
          <UserLogin
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}
        onClose={() => [setOpenSignUpForm(false)]}
      >
        <DialogContent>
          <UserSignUp
            token={props.token}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleSuccessfulSignUpDialogOpenStatusWithSnackbar={
              handleSuccessfulSignUpDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openForgotPasswordForm}
        //onClose={() => [setOpenForgotPasswordForm(false), history.push("/")]}
        onClose={() => [setOpenForgotPasswordForm(false)]}
      >
        <DialogContent>
          <UserPasswordReset
            token={props.token}
            userId={props.userId}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleMakeCloseForgotPasswordFormDialogStatus={
              handleMakeCloseForgotPasswordFormDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
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

  if (!product) {
    return <></>;
  }

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="row">
            <Grid item style={{ width: "26.94%" }}>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                {product.configuration ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({product.configuration})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                  </Typography>
                )}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 20 }}
                >
                  {Str(product.shortDescription).limit(200, "...").get()}
                </Typography>
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference !== "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span style={{ marginLeft: 130 }}>
                        <strong>
                          {getCurrencyCode()}
                          {product.pricePerUnit
                            ? product.pricePerUnit
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : 0}
                        </strong>
                      </span>
                    </Typography>
                  )}
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference === "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {product.showDealPricePerUnit ? (
                        <span style={{ marginLeft: 130 }}>
                          <strong>
                            {getCurrencyCode()}
                            {product.pricePerUnit
                              ? product.pricePerUnit
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              : 0}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                    </Typography>
                  )}
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference !== "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span
                        style={{
                          marginLeft: 130,
                          color: "red",
                          fontSize: 12,
                        }}
                      >
                        <strong>{product.priceLabel}</strong>
                      </span>
                    </Typography>
                  )}
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference === "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {product.showDealPricePerUnit ? (
                        <span
                          style={{
                            marginLeft: 130,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{product.priceLabel}</strong>
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: 130,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{product.priceLabel}</strong>
                        </span>
                      )}
                    </Typography>
                  )}
                {product.pricingMechanism === "request-quote" && (
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {product.pricePerUnit
                          ? product.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </strong>
                      <span style={{ fontSize: 12 }}>per unit</span>
                    </span>
                  </Typography>
                )}
                {product.pricingMechanism === "request-quote" && (
                  <Typography
                    //variant="h6"
                    color="red"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span
                      style={{ marginLeft: 130, color: "red", fontSize: 12 }}
                    >
                      <strong>{product.priceLabel}</strong>
                    </span>
                  </Typography>
                )}
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Market Pricing Condition:</strong>
                    <span>{product.marketPricingCondition}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Weight per Unit:</strong>
                    <span>
                      {product.weightPerUnit} {product.unit}{" "}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Brand:</strong>
                    <span>{product.brand}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Stock Availability:</strong>
                    <span>{product.stockStatus}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Deliverability:</strong>
                    <span>{product.deliverability}</span>
                  </span>
                </Typography>

                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Pickup Availability:</strong>
                    <span>{product.pickupInfo}</span>
                  </span>
                </Typography>
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Code:</strong>
                      <span>{product.dealCode}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Expiry Date:</strong>
                      <span>{product.dealExpiryDate}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Type:</strong>
                      <span>{product.dealType}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Status:</strong>
                      <span>{product.dealStatus}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Direction:</strong>
                      <span>{product.dealComment}</span>
                    </span>
                  </Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.50%", border: "1px dotted grey" }}>
              {product.pricePerUnit && (
                <CartUpdateAndDeliveryForm
                  price={product.pricePerUnit}
                  minimumQuantity={product.minimumQuantity}
                  unit={product.unit}
                  weightPerUnit={product.weightPerUnit}
                  unitInCart={props.unit}
                  salesPreference={product.salesPreference}
                  showDealPricePerUnit={product.showDealPricePerUnit}
                  allowDealQuantityChange={product.allowDealQuantityChange}
                  showDealPaymentDetails={product.showDealPaymentDetails}
                  dealPaymentPreference={product.dealPaymentPreference}
                  requestDealRedemptionCode={product.requestDealRedemptionCode}
                  weightPerUnitInCart={props.weightPerUnit}
                  productId={product.id}
                  currency={props.currency}
                  preferredStartDate={props.preferredStartDate}
                  cartCounterHandler={props.cartCounterHandler}
                  token={props.token}
                  userId={props.userId}
                  quantity={props.quantity}
                  cartId={props.cartId}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  renderCartUpdate={props.renderCartUpdate}
                  renderCartUpdateAfterRemoval={
                    props.renderCartUpdateAfterRemoval
                  }
                />
              )}
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="column">
            <Grid item style={{ width: "100%" }}>
              <CardMedia
                className={classes.mediaMobile}
                component="img"
                alt={product.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                {product.configuration ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({product.configuration})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {product.name}
                  </Typography>
                )}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {Str(product.shortDescription).limit(200, "...").get()}
                </Typography>
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference !== "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span style={{ marginLeft: 60 }}>
                        <strong>
                          {getCurrencyCode()}
                          {product.pricePerUnit
                            ? product.pricePerUnit
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : 0}
                        </strong>
                      </span>
                    </Typography>
                  )}
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference === "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {product.showDealPricePerUnit ? (
                        <span style={{ marginLeft: 60 }}>
                          <strong>
                            {getCurrencyCode()}
                            {product.pricePerUnit
                              ? product.pricePerUnit
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              : 0}
                          </strong>
                        </span>
                      ) : (
                        ""
                      )}
                    </Typography>
                  )}
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference !== "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span
                        style={{
                          marginLeft: 60,
                          color: "red",
                          fontSize: 12,
                        }}
                      >
                        <strong>{product.priceLabel}</strong>
                      </span>
                    </Typography>
                  )}
                {product.pricingMechanism === "pricing" &&
                  product.salesPreference === "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {product.showDealPricePerUnit ? (
                        <span
                          style={{
                            marginLeft: 60,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{product.priceLabel}</strong>
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: 60,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{product.priceLabel}</strong>
                        </span>
                      )}
                    </Typography>
                  )}
                {product.pricingMechanism === "request-quote" && (
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 60 }}>
                      <strong>
                        {getCurrencyCode()}
                        {product.pricePerUnit
                          ? product.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </strong>
                      <span style={{ fontSize: 12 }}>per unit</span>
                    </span>
                  </Typography>
                )}
                {product.pricingMechanism === "request-quote" && (
                  <Typography
                    //variant="h6"
                    color="red"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span
                      style={{ marginLeft: 60, color: "red", fontSize: 12 }}
                    >
                      <strong>{product.priceLabel}</strong>
                    </span>
                  </Typography>
                )}
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong> Market Pricing Condition:</strong>
                    <span>{product.marketPricingCondition}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Weight per Unit:</strong>
                    <span>
                      {product.weightPerUnit} {product.unit}{" "}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Brand:</strong>
                    <span>{product.brand}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Stock Availability:</strong>
                    <span>{product.stockStatus}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Deliverability:</strong>
                    <span>{product.deliverability}</span>
                  </span>
                </Typography>

                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Pickup Availability:</strong>
                    <span>{product.pickupInfo}</span>
                  </span>
                </Typography>
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Deal Code:</strong>
                      <span>{product.dealCode}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Deal Expiry Date:</strong>
                      <span>{product.dealExpiryDate}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Deal Type:</strong>
                      <span>{product.dealType}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Deal Status:</strong>
                      <span>{product.dealStatus}</span>
                    </span>
                  </Typography>
                )}
                {product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Deal Direction:</strong>
                      <span>{product.dealComment}</span>
                    </span>
                  </Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              {product.pricePerUnit && (
                <CartUpdateAndDeliveryForm
                  price={product.pricePerUnit}
                  minimumQuantity={product.minimumQuantity}
                  unit={product.unit}
                  weightPerUnit={product.weightPerUnit}
                  unitInCart={props.unit}
                  salesPreference={product.salesPreference}
                  showDealPricePerUnit={product.showDealPricePerUnit}
                  allowDealQuantityChange={product.allowDealQuantityChange}
                  showDealPaymentDetails={product.showDealPaymentDetails}
                  dealPaymentPreference={product.dealPaymentPreference}
                  requestDealRedemptionCode={product.requestDealRedemptionCode}
                  weightPerUnitInCart={props.weightPerUnit}
                  productId={product.id}
                  currency={props.currency}
                  preferredStartDate={props.preferredStartDate}
                  cartCounterHandler={props.cartCounterHandler}
                  token={props.token}
                  userId={props.userId}
                  quantity={props.quantity}
                  cartId={props.cartId}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  renderCartUpdate={props.renderCartUpdate}
                  renderCartUpdateAfterRemoval={
                    props.renderCartUpdateAfterRemoval
                  }
                />
              )}
            </Grid>
          </Grid>
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>

          {/* <Bookings
            token={props.token}
            userId={props.userId}
            handleBookingsOpenDialogStatus={handleBookingsOpenDialogStatus}
          /> */}
        </DialogContent>
      </Dialog>
      {renderLoginForm()}
      {renderSignUpForm()}
      {renderForgotPasswordForm()}
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
    </>
  );
}
