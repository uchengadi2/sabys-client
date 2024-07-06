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
import Box from "@material-ui/core/Box";

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import api from "./../../apis/local";
import CoverImage from "./../../assets/images/home/course6.jpg";
//import MobileCoverImage from "/../../assets/images/home/mobile/cover2.png";
import MobileCoverImage from "./../../assets/images/home/mobile/cover2.png";
import background from "./../../assets/images/home/course6.jpg";
import CourseInfo from "./CourseInfo";
import ProductInfo from "./ProductInfo";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import VendorPartner from "../VendorPartner";

//import CheckoutActionPage from "./CheckoutActionPage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: 440,
    //height: 550,
    //width: "100%",
    width: 1335,
    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "5rem",
    marginBottom: "1.5em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "3.5em",
    marginBottom: "3em",
    padding: 0,

    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  imageContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  image: {
    //height: 550,
    width: "100%",
    marginLeft: -15,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "6.5em",
    },
  },
  imageMobile: {
    height: "100%",
    width: "100%",
    marginLeft: 10,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7.5em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "28.5em",
      width: "22.5em",
    },
  },
  // media: {
  //   height: 550,
  //   width: 650,
  // },

  media: {
    height: "100%",
    width: "100%",
    //width: 650,
    marginLeft: "0px",
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
  homeButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 180,
    marginRight: 10,
    marginTop: 80,
    marginLeft: 160,
    fontWeight: 500,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  homeMobileButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 220,
    marginRight: 10,
    marginTop: 80,
    marginLeft: 40,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
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
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function AllProducts(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();

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
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.currency}`);
      const currency = response.data.data.data;

      allData.push({
        id: currency._id,
        name: currency.name,
      });
      setCurrencyName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${props.image}`;
  }
  const imageMobileUrl = MobileCoverImage;

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

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: "You have successfully logged in",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not logged you in. Please ensure your login credentials are correct",
      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: "You have successfully signed up",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not sign you up. Please ensure you are connected to the internet and all required fields are completed",
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
        <Card className={classes.root}>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="row" style={{ width: "100%" }}>
            <Grid item style={{ width: "26.94%" }}>
              <CardMedia
                className={classes.media}
                component="img"
                alt={props.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent>
                <Typography variant="h4" color="textSecondary" component="p">
                  {props.name}
                  <span style={{ fontSize: 16, fontWeight: 700 }}>
                    <em> ({props.configuration})</em>
                  </span>
                </Typography>
                <br />
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {Str(props.shortDescription).limit(200, "...").get()}
                </Typography>
                <br />
                {props.pricingMechanism === "pricing" &&
                  props.salesPreference !== "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span style={{ marginLeft: 130 }}>
                        <strong>
                          {getCurrencyCode()}
                          {props.pricePerUnit
                            ? props.pricePerUnit
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : 0}
                        </strong>
                      </span>
                    </Typography>
                  )}
                {props.pricingMechanism === "pricing" &&
                  props.salesPreference === "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {props.showDealPricePerUnit ? (
                        <span style={{ marginLeft: 130 }}>
                          <strong>
                            {getCurrencyCode()}
                            {props.pricePerUnit
                              ? props.pricePerUnit
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              : 0}
                          </strong>
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: 50,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.priceLabel}</strong>
                        </span>
                      )}
                    </Typography>
                  )}
                {props.pricingMechanism === "pricing" &&
                  props.salesPreference !== "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span
                        style={{ marginLeft: 130, color: "red", fontSize: 12 }}
                      >
                        <strong>{props.priceLabel}</strong>
                      </span>
                    </Typography>
                  )}
                {props.pricingMechanism === "pricing" &&
                  props.salesPreference === "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {props.showDealPricePerUnit ? (
                        <span
                          style={{
                            marginLeft: 130,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.priceLabel}</strong>
                        </span>
                      ) : (
                        ""
                      )}
                    </Typography>
                  )}
                {props.pricingMechanism === "request-quote" && (
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {props.pricePerUnit
                          ? props.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </strong>
                      <span style={{ fontSize: 12 }}>per unit</span>
                    </span>
                  </Typography>
                )}
                {props.pricingMechanism === "request-quote" && (
                  <Typography
                    //variant="h6"
                    color="red"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span
                      style={{ marginLeft: 130, color: "red", fontSize: 12 }}
                    >
                      <strong>{props.priceLabel}</strong>
                    </span>
                  </Typography>
                )}
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Market Pricing Condition:</strong>
                    <span>{props.marketPricingCondition}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Product Type:</strong>
                    <span>{props.productType}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Weight per Unit:</strong>
                    <span>
                      {props.weightPerUnit} {props.unit}{" "}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}>
                    <strong>Minimum Order Quantity Required:</strong> &nbsp;
                    <span>
                      {props.minimumQuantity
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      &nbsp; {props.minimumQuantity <= 1 ? "unit" : "units"}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Product SKU:</strong>
                    <span>{props.sku}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Sales Preference:</strong>
                    <span>{props.salesPreference}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Stock Availability:</strong>
                    <span>{props.stockStatus}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Brand:</strong>
                    <span>{props.brand}</span>
                  </span>
                </Typography>
                {props.deliverability && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deliverability:</strong>

                      <span>{props.deliverability}</span>
                    </span>
                  </Typography>
                )}
                {props.pickupInfo && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Pickup Availability:</strong>
                      <span>{props.pickupInfo}</span>
                    </span>
                  </Typography>
                )}
                {props.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Code:</strong>
                      <span>{props.dealCode}</span>
                    </span>
                  </Typography>
                )}
                {props.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Expiry Date:</strong>
                      <span>{props.dealExpiryDate}</span>
                    </span>
                  </Typography>
                )}
                {props.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Type:</strong>
                      <span>{props.dealType}</span>
                    </span>
                  </Typography>
                )}
                {props.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Status:</strong>
                      <span>{props.dealStatus}</span>
                    </span>
                  </Typography>
                )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>Target Scheme Initial % Contribution:</strong>
                        <span>
                          {props.dealInitialPercentageContribution * 100}%
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>
                          Maximum Allowable Contribution Installments:
                        </strong>
                        <span>{props.dealMaximumInstallmentAllowed}</span>
                      </span>
                    </Typography>
                  )}
                {props.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Instruction:</strong>
                      <span>{props.dealComment}</span>
                    </span>
                  </Typography>
                )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal === true &&
                  props.dealType === "private" &&
                  props.isACreditDeal === false && (
                    <Typography>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          marginLeft: 10,
                        }}
                      >
                        {/* <strong> Note:</strong> */}
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 20,
                          }}
                        >
                          This Is A Private TARGET SCHEME Without Credit
                          Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal === true &&
                  props.dealType === "private" &&
                  props.isACreditDeal === true && (
                    <Typography>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          marginLeft: 10,
                        }}
                      >
                        {/* <strong> Note:</strong> */}
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 20,
                          }}
                        >
                          This Is A Private TARGET SCHEME With Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal === true &&
                  props.dealType === "public" &&
                  props.isACreditDeal === false && (
                    <Typography>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          marginLeft: 10,
                          marginTop: 10,
                        }}
                      >
                        {/* <strong> Note:</strong> */}
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 20,
                          }}
                        >
                          This Is A Public TARGET SCHEME without Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal === true &&
                  props.dealType === "public" &&
                  props.isACreditDeal === true && (
                    <Typography>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          marginLeft: 10,
                          marginTop: 10,
                        }}
                      >
                        {/* <strong> Note:</strong> */}
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 20,
                          }}
                        >
                          This Is A Public TARGET SCHEME With Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.salesPreference === "deal" &&
                  props.isAContributoryDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Note:</strong> */}
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 20,
                          }}
                        >
                          This Is Not A TARGET SCHEME
                        </span>
                      </span>
                    </Typography>
                  )}
                <br /> <br />
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.50%", border: "1px dotted grey" }}>
              <ProductInfo
                pricingMechanism={props.pricingMechanism}
                salesPreference={props.salesPreference}
                showDealPricePerUnit={props.showDealPricePerUnit}
                allowDealQuantityChange={props.allowDealQuantityChange}
                dealStatus={props.dealStatus}
                dealType={props.dealType}
                isAContributoryDeal={props.isAContributoryDeal}
                allowPriceFreezing={props.allowPriceFreezing}
                isACreditDeal={props.isACreditDeal}
                //tools={props.tools}
                //policy={props.policy}
                currency={props.currency}
                //targetAudience={props.targetAudience}
                //whatToLearn={props.whatToLearn}
                //venueLink={props.venueLink}
                categoryId={props.category}
                productId={props.courseId}
                //requestQuote={props.requestQuote}
                slug={props.slug}
                categorySlug={props.categorySlug}
                updateBuyingPathInfoInfo={props.updateBuyingPathInfoInfo}
              />
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <CardActionArea disableRipple>
            <Grid container direction="row">
              <Grid item style={{ width: "100%" }}>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={props.name}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  {props.configuration ? (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {props.name}
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        <em> ({props.configuration})</em>
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {props.name}
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {Str(props.shortDescription).limit(200, "...").get()}
                  </Typography>
                  {props.pricingMechanism === "pricing" &&
                    props.salesPreference !== "deal" && (
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="p"
                        style={{ marginTop: 5, marginBottom: 15 }}
                      >
                        <span style={{ marginLeft: 50 }}>
                          <strong>
                            {getCurrencyCode()}
                            {props.pricePerUnit
                              ? props.pricePerUnit
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              : 0}
                          </strong>
                        </span>
                      </Typography>
                    )}
                  {props.pricingMechanism === "pricing" &&
                    props.salesPreference === "deal" && (
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="p"
                        style={{ marginTop: 5, marginBottom: 15 }}
                      >
                        {props.showDealPricePerUnit ? (
                          <span style={{ marginLeft: 50 }}>
                            <strong>
                              {getCurrencyCode()}
                              {props.pricePerUnit
                                ? props.pricePerUnit
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
                  {props.pricingMechanism === "pricing" &&
                    props.salesPreference !== "deal" && (
                      <Typography
                        //variant="h6"
                        color="red"
                        component="p"
                        style={{ marginTop: 5, marginBottom: 15 }}
                      >
                        <span
                          style={{
                            marginLeft: 50,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.priceLabel}</strong>
                        </span>
                      </Typography>
                    )}
                  {props.pricingMechanism === "pricing" &&
                    props.salesPreference === "deal" && (
                      <Typography
                        //variant="h6"
                        color="red"
                        component="p"
                        style={{ marginTop: 5, marginBottom: 15 }}
                      >
                        {props.showDealPricePerUnit ? (
                          <span
                            style={{
                              marginLeft: 50,
                              color: "red",
                              fontSize: 12,
                            }}
                          >
                            <strong>{props.priceLabel}</strong>
                          </span>
                        ) : (
                          <span
                            style={{
                              marginLeft: 50,
                              color: "red",
                              fontSize: 12,
                            }}
                          >
                            <strong>{props.priceLabel}</strong>
                          </span>
                        )}
                      </Typography>
                    )}
                  {props.pricingMechanism === "request-quote" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span style={{ marginLeft: 50 }}>
                        <strong>
                          {getCurrencyCode()}
                          {props.pricePerUnit
                            ? props.pricePerUnit
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : 0}
                        </strong>
                        <span style={{ fontSize: 12 }}>per unit</span>
                      </span>
                    </Typography>
                  )}
                  {props.pricingMechanism === "request-quote" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span
                        style={{ marginLeft: 50, color: "red", fontSize: 12 }}
                      >
                        <strong>{props.priceLabel}</strong>
                      </span>
                    </Typography>
                  )}
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Market Pricing Condition:</strong>
                      <span>{props.marketPricingCondition}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Product Type:</strong>
                      <span>{props.productType}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Weight per Unit:</strong>
                      <span>
                        {props.weightPerUnit} {props.unit}{" "}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span
                      style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                    >
                      <strong>Minimum Quantity Required:</strong> &nbsp;
                      <span>
                        {props.minimumQuantity
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        &nbsp;
                        {props.minimumQuantity <= 1 ? "unit" : "units"}
                      </span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Product SKU:</strong>
                      <span>{props.sku}</span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Sales Preference:</strong>
                      <span>{props.salesPreference}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Stock Availability:</strong>
                      <span>{props.stockStatus}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong>Brand:</strong>
                      <span>{props.brand}</span>
                    </span>
                  </Typography>
                  {props.deliverability && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Deliverability:</strong>

                        <span>{props.deliverability}</span>
                      </span>
                    </Typography>
                  )}
                  {props.pickupInfo && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Pickup Availability:</strong>
                        <span>{props.pickupInfo}</span>
                      </span>
                    </Typography>
                  )}
                  {props.salesPreference === "deal" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Deal Code:</strong>
                        <span>{props.dealCode}</span>
                      </span>
                    </Typography>
                  )}
                  {props.salesPreference === "deal" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Deal Expiry Date:</strong>
                        <span>{props.dealExpiryDate}</span>
                      </span>
                    </Typography>
                  )}
                  {props.salesPreference === "deal" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Deal Type:</strong>
                        <span>{props.dealType}</span>
                      </span>
                    </Typography>
                  )}
                  {props.salesPreference === "deal" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Deal Status:</strong>
                        <span>{props.dealStatus}</span>
                      </span>
                    </Typography>
                  )}
                  {props.salesPreference === "deal" && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Deal Instruction:</strong>
                        <span>{props.dealComment}</span>
                      </span>
                    </Typography>
                  )}
                  {props.salesPreference === "deal" &&
                    props.isAContributoryDeal === true &&
                    props.dealType === "private" &&
                    props.isACreditDeal === false && (
                      <Typography>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            marginLeft: 10,
                          }}
                        >
                          {/* <strong> Note:</strong> */}
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 700,
                              marginLeft: 10,
                              marginTop: 20,
                            }}
                          >
                            This Is A Private TARGET SCHEME without Credit
                            Facility
                          </span>
                        </span>
                      </Typography>
                    )}

                  {props.salesPreference === "deal" &&
                    props.isAContributoryDeal === true &&
                    props.dealType === "private" &&
                    props.isACreditDeal === true && (
                      <Typography>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            marginLeft: 10,
                          }}
                        >
                          {/* <strong> Note:</strong> */}
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 700,
                              marginLeft: 10,
                              marginTop: 20,
                            }}
                          >
                            This Is A Private TARGET SCHEME with Credit Facility
                          </span>
                        </span>
                      </Typography>
                    )}
                  {props.salesPreference === "deal" &&
                    props.isAContributoryDeal === true &&
                    props.dealType === "public" &&
                    props.isACreditDeal === false && (
                      <Typography>
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          {/* <strong> Note:</strong> */}
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 700,
                              marginLeft: 10,
                              marginTop: 20,
                            }}
                          >
                            This Is A Public TARGET SCHEME without Credit
                            Facility
                          </span>
                        </span>
                      </Typography>
                    )}

                  {props.salesPreference === "deal" &&
                    props.isAContributoryDeal === true &&
                    props.dealType === "public" &&
                    props.isACreditDeal === true && (
                      <Typography>
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            marginLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          {/* <strong> Note:</strong> */}
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 700,
                              marginLeft: 10,
                              marginTop: 20,
                            }}
                          >
                            This Is A Public TARGET SCHEME with Credit Facility
                          </span>
                        </span>
                      </Typography>
                    )}
                  {props.salesPreference === "deal" &&
                    props.isAContributoryDeal === false && (
                      <Typography>
                        <span style={{ fontSize: 14, marginLeft: 10 }}>
                          {/* <strong> Note:</strong> */}
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 700,
                              marginLeft: 10,
                              marginTop: 20,
                            }}
                          >
                            This Is Not A TARGET SCHEME
                          </span>
                        </span>
                      </Typography>
                    )}
                </CardContent>
              </Grid>

              <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
                <ProductInfo
                  //benefits={props.benefits}
                  pricingMechanism={props.pricingMechanism}
                  salesPreference={props.salesPreference}
                  showDealPricePerUnit={props.showDealPricePerUnit}
                  allowDealQuantityChange={props.allowDealQuantityChange}
                  dealStatus={props.dealStatus}
                  dealType={props.dealType}
                  isAContributoryDeal={props.isAContributoryDeal}
                  allowPriceFreezing={props.allowPriceFreezing}
                  isACreditDeal={props.isACreditDeal}
                  //tools={props.tools}
                  // policy={props.policy}
                  currency={props.currency}
                  //targetAudience={props.targetAudience}
                  // whatToLearn={props.whatToLearn}
                  //venueLink={props.venueLink}
                  categoryId={props.category}
                  productId={props.courseId}
                  //requestQuote={props.requestQuote}
                  slug={props.slug}
                  categorySlug={props.categorySlug}
                  updateBuyingPathInfoInfo={props.updateBuyingPathInfoInfo}
                />
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
