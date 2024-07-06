import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
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
import Grid from "@material-ui/core/Grid";

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import LoginForm from "../authForms/LoginForm";
import UserSignUp from "./../users/UserSignUp";
import SignUpForm from "../authForms/SignUpForm";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import SendProductToCartForm from "./SendProductToCartForm";
import SendCourseToCheckoutForm from "./SendCourseToCheckoutForm";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import { RoomSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 325,
    maxWidth: "100%",
    width: "98%",
    //width: "98%",
    //width: "100%",
    //height: 440,
    //height: 500,

    //marginLeft: "0.1%",
    borderRadius: 0,
    marginTop: "6em",
    padding: 0,
    // "&:hover": {
    //   border: "solid",
    //   borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",

    //height: 440,
    //height: 800,
    width: "85%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 2,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: "100%",
    width: "100%",
    //marginLeft: "100px",
  },
  media: {
    //height: 400,
    //width: 400,
    width: "25%",
    height: "100%",
  },

  mediaImageMobile: {
    height: "100%",
    width: "100%",
    //marginLeft: "100px",
  },
  mediaImage: {
    //height: 400,
    //width: "27.5rem",
    height: 400,
    width: "100%",
  },

  videoMedia: {
    height: 400,
    width: "100%",
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
  secondRow: {
    marginLeft: "0.5%",
    //width: 450,
    width: "45%",
    border: "1px dotted",
    padding: 20,
  },
  imageColumn: {
    //marginLeft: 5,
    width: 380,

    border: "1px dotted",
    //padding: 5,
  },
  secondRowMobile: {
    marginLeft: 0,
    marginTop: "7.5em",
    // width: 380,
    width: "100%",
    border: "1px dotted",
    padding: 10,
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  thirdRow: {
    marginLeft: "0.5%",
    //width: 330,
    width: "29%",
    border: "1px dotted",
    padding: 10,
  },
  thirdRowMobile: {
    marginLeft: 0,
    marginTop: 10,
    // width: 380,
    width: "100%",
    border: "1px dotted",
    padding: 5,
  },

  secondColumn: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "32%",
  },
  secondColumnMobile: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  thirdColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "100%",
  },
  thirdColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "100%",
  },
  forthColumn: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  forthColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  fifthColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "100%",
  },
  fifthColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  sixthColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  sixthColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  secondColumnImage: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "22%",
  },
  secondColumnImageMobile: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
}));

export default function ProductDetailCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [currencyName, setCurrencyName] = useState("");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [price, setPrice] = useState();
  const [minQuantity, setMinQuantity] = useState();
  const [images, setImages] = useState([]);
  const [policy, setPolicy] = useState();
  const [currency, setCurrency] = useState();

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

  //const imageUrl = `${baseURL}/images/categories/${props.image}`;
  const imageUrl = `${baseURL}/images/products/${props.product.image}`;

  const Str = require("@supercharge/strings");

  // console.log(
  //   "this is description trim:",
  //   Str(props.description).limit(100, "...").get()
  // );

  useEffect(() => {
    setPrice(props.product.pricePerUnit);
    setCurrency(props.product.currency);
  }, [props.product]);
  useEffect(() => {
    setImages(props.product.images);
  }, [props]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      //setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/policies`, {
        params: { status: "active" },
      });
      const policies = response.data.data.data;

      policies.map((policy) => {
        allData.push({
          id: policy._id,
          country: policy.country,
          currency: policy.currency,
          vat: policy.vat,
          implementVatCollection: policy.implementVatCollection,
          implementSalesTaxCollection: policy.implementSalesTaxCollection,
          salesTaxDirection: policy.salesTaxDirection,
          status: policy.status,
          shoppingMode: policy.shoppingMode,
          onlineOrigin: policy.onlineOrigin,
          allowCentralCommission: policy.allowCentralCommission,
          commissionRate: policy.commissionRate,
          allowOriginSalesTax: policy.allowOriginSalesTax,
          implementSalesTaxCollection: policy.implementSalesTaxCollection,
        });
      });

      setPolicy(allData[0]);
      //setCurrency(allData[0].currency);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.product.currency}`);
      const currency = response.data.data.data;
      allData.push({ id: currency._id, name: currency.name });
      setCurrencyName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

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

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    setOpen({ open: false });
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
    setOpen({ open: false });
  };
  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(true);
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

  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(true);
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

  // const handleLogOutDialogOpenStatus = () => {
  //   // history.push("/categories/new");
  //   setOpenLogOut(false);
  // };
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
          <LoginForm
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

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}\
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

  return (
    <>
      {matchesMDUp ? (
        <Grid container direction="column" className={classes.root}>
          <Grid item container direction="row">
            <Grid item className={classes.media}>
              <Card>
                <CardMedia
                  // className={classes.media}
                  component="img"
                  alt={props.product.name}
                  image={imageUrl}
                  //   title={props.name}
                  crossOrigin="anonymous"
                />
              </Card>
            </Grid>
            <Grid item className={classes.secondRow}>
              <Box>
                <Typography variant="h4" color="textSecondary" component="p">
                  {props.product.name}&nbsp;
                  <span style={{ fontSize: 16, marginLeft: 0 }}>
                    ({props.product.configuration})
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <ReactMarkdown>
                    {props.product.shortDescription}
                  </ReactMarkdown>
                </Typography>
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference !== "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span style={{ marginLeft: 130 }}>
                        <strong>
                          {getCurrencyCode()}
                          {price
                            ? price
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : 0}
                        </strong>
                      </span>
                    </Typography>
                  )}
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference === "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {props.product.showDealPricePerUnit ? (
                        <span style={{ marginLeft: 130 }}>
                          <strong>
                            {getCurrencyCode()}
                            {price
                              ? price
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
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference !== "deal" && (
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
                        <strong>{props.product.priceLabel}</strong>
                      </span>
                    </Typography>
                  )}
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference === "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {props.product.showDealPricePerUnit ? (
                        <span
                          style={{
                            marginLeft: 130,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.product.priceLabel}</strong>
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: 130,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.product.priceLabel}</strong>
                        </span>
                      )}
                    </Typography>
                  )}
                {props.product.pricingMechanism === "request-quote" && (
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {price
                          ? price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </strong>
                      <span style={{ fontSize: 12 }}>per unit</span>
                    </span>
                  </Typography>
                )}
                {props.product.pricingMechanism === "request-quote" && (
                  <Typography
                    //variant="h6"
                    color="red"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span
                      style={{ marginLeft: 130, color: "red", fontSize: 12 }}
                    >
                      <strong>{props.product.priceLabel}</strong>
                    </span>
                  </Typography>
                )}

                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10, marginTop: 15 }}>
                    <strong> Market Pricing Condition:</strong>
                    <span>{props.product.marketPricingCondition}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10, marginTop: 15 }}>
                    <strong> Product Type:</strong>
                    <span>{props.product.productType}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Weight per Unit:</strong>
                    <span>
                      {props.product.weightPerUnit} {props.product.unit}{" "}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}>
                    <strong>Minimum Order Quantity Required:</strong> &nbsp;
                    <span>
                      {props.product.minimumQuantity
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      &nbsp;{" "}
                      {props.product.minimumQuantity <= 1 ? "unit" : "units"}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Product SKU:</strong>
                    <span>{props.product.sku}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Sales Preference:</strong>
                    <span>{props.product.salesPreference}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Stock Availability:</strong>
                    <span>{props.product.stockStatus}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong>Brand:</strong>
                    <span>{props.product.brand}</span>
                  </span>
                </Typography>
                {props.product.deliverability && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deliverability:</strong>

                      <span>{props.product.deliverability}</span>
                    </span>
                  </Typography>
                )}
                {props.product.pickupInfo && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Pickup Availability:</strong>
                      <span>{props.product.pickupInfo}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Code:</strong>
                      <span>{props.product.dealCode}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Expiry Date:</strong>
                      <span>{props.product.dealExpiryDate}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Type:</strong>
                      <span>{props.product.dealType}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Status:</strong>
                      <span>{props.product.dealStatus}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Instruction:</strong>
                      <span>{props.product.dealComment}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" &&
                  props.product.isAContributoryDeal && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Target Scheme Initial % Contribution:</strong>
                        <span>
                          {props.product.dealInitialPercentageContribution *
                            100}
                          %
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.isAContributoryDeal && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>
                          Maximum Allowable Contribution Installments :
                        </strong>
                        <span>
                          {props.product.dealMaximumInstallmentAllowed}
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "private" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Private Target Scheme without a Credit
                          Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "private" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === true && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Private Target Scheme with a Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "public" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Public Target Scheme without a Credit
                          Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "public" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === true && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Public Target Scheme with a Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "public" &&
                  props.product.isAContributoryDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is Not A Target Scheme
                        </span>
                      </span>
                    </Typography>
                  )}
              </Box>
            </Grid>

            <Grid item className={classes.thirdRow}>
              <Box>
                <SendCourseToCheckoutForm
                  price={price}
                  currency={currency}
                  unit={props.product.unit}
                  minQuantity={props.product.minimumQuantity}
                  weightPerUnit={props.product.weightPerUnit}
                  productId={props.product.id}
                  categorySlug={props.categorySlug}
                  slug={props.slug}
                  category={props.category}
                  token={props.token}
                  requestQuote={props.product.requestQuote}
                  pricingMechanism={props.product.pricingMechanism}
                  allowSubscription={props.product.allowSubscription}
                  presentWeightUnitIn={props.product.presentWeightUnitIn}
                  salesPreference={props.product.salesPreference}
                  dealCode={props.product.dealCode}
                  dealExpiryDate={props.product.dealExpiryDate}
                  showDealPricePerUnit={props.product.showDealPricePerUnit}
                  allowDealQuantityChange={
                    props.product.allowDealQuantityChange
                  }
                  dealStatus={props.product.dealStatus}
                  dealType={props.product.dealType}
                  dealComment={props.product.dealComment}
                  dealDeliveryMode={props.product.dealDeliveryMode}
                  dealCentralizedDeliveryLocation={
                    props.product.dealCentralizedDeliveryLocation
                  }
                  dealCentralizedAgreedDeliveryCost={
                    props.product.dealCentralizedAgreedDeliveryCost
                  }
                  dealDecentralizedDeliveryLocation={
                    props.product.dealDecentralizedDeliveryLocation
                  }
                  dealDecentralizedAgreedDeliveryCost={
                    props.product.dealDecentralizedAgreedDeliveryCost
                  }
                  showDealDeliveryCost={props.product.showDealDeliveryCost}
                  productType={props.product.productType}
                  dealPaymentPreference={props.product.dealPaymentPreference}
                  showDealPaymentDetails={props.product.showDealPaymentDetails}
                  requestDealRedemptionCode={
                    props.product.requestDealRedemptionCode
                  }
                  isAContributoryDeal={props.product.isAContributoryDeal}
                  isACreditDeal={props.product.isACreditDeal}
                  dealOwner={props.product.dealOwner}
                  dealOwnerEntity={props.product.dealOwnerEntity}
                  dealInitialPercentageContribution={
                    props.product.dealInitialPercentageContribution
                  }
                  dealMaximumInstallmentAllowed={
                    props.product.dealMaximumInstallmentAllowed
                  }
                  includeGatewayChargesInPrice={
                    props.product.includeGatewayChargesInPrice
                  }
                  gatewayFixedCharge={props.product.gatewayFixedCharge}
                  gatewayRateCharge={props.product.gatewayRateCharge}
                  allowPriceFreezing={props.product.allowPriceFreezing}
                  isVatable={props.product.isVatable}
                  revenueMargin={props.product.revenueMargin}
                  revenueMarginShouldPrevail={
                    props.product.revenueMarginShouldPrevail
                  }
                  origins={props.product.origins}
                  userId={props.userId}
                  handleMakeOpenSignUpDialogStatus={
                    handleMakeOpenSignUpDialogStatus
                  }
                  handleMakeCloseSignUpDialogStatus={
                    handleMakeCloseSignUpDialogStatus
                  }
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleMakeCloseForgotPasswordFormDialogStatus={
                    handleMakeCloseForgotPasswordFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  handleFailedSignUpDialogOpenStatusWithSnackbar={
                    handleFailedSignUpDialogOpenStatusWithSnackbar
                  }
                  cartCounterHandler={props.cartCounterHandler}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {props.product.ingredients && (
              <Grid
                item
                className={classes.secondColumn}
                style={{ marginLeft: "2%" }}
              >
                <Box>
                  <Typography>
                    <strong>Ingredients:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.ingredients}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}

            {props.product.sideEffects && (
              <Grid
                item
                className={classes.secondColumn}
                style={{ marginLeft: "0.5%" }}
              >
                <Box>
                  <Typography>
                    <strong>Side Effects:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.sideEffects}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}
            {props.product.benefits && (
              <Grid
                item
                className={classes.secondColumn}
                style={{ marginLeft: "0.5%" }}
              >
                <Box>
                  <Typography>
                    <strong>Benefits:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.benefits}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}
            {/* {props.product.howToUse && (
              <Grid
                item
                className={classes.secondColumn}
                style={{ marginLeft: "0.5%" }}
              >
                <Box>
                  <Typography>
                    <strong>How To Use:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.howToUse}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )} */}
          </Grid>
          {props.product.howToUse && (
            <Grid item className={classes.forthColumn}>
              <Box>
                <Typography>
                  <strong>How To Use:</strong>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <ReactMarkdown>{props.product.howToUse}</ReactMarkdown>
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item className={classes.thirdColumn}>
            <Box>
              <Typography>
                <strong>Product Description:</strong>
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "black",
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                <ReactMarkdown>{props.product.fullDescription}</ReactMarkdown>
              </Typography>
            </Box>
          </Grid>
          {props.product.testimonials && (
            <Grid item className={classes.thirdColumn}>
              <Box>
                <Typography>
                  <strong>Testimonails:</strong>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <ReactMarkdown>{props.product.testimonials}</ReactMarkdown>
                </Typography>
              </Box>
            </Grid>
          )}
          {/**Images start here */}
          {images[0] && (
            <Typography
              variant="h5"
              style={{ color: "black", fontSize: 15, marginLeft: 30 }}
            >
              <strong>
                {images.length > 1 ? "Product Images" : "Product Image"}
              </strong>
            </Typography>
          )}
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[0] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[0]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[1] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[1]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[2] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[2]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[3] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[3]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[4] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[4]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[5] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[5]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[6] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[6]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[7] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[7]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[8] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[8]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[9] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[9]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[10] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[10]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[11] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[11]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[12] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[12]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[13] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[13]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[14] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[14]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[15] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[15]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[16] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[16]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[17] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[17]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[18] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[18]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[19] && (
              <Grid
                item
                className={classes.secondColumnImage}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImage}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[19]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>{" "}
          {/**images ends here**/}
          {props.product.video && (
            <Typography
              variant="h5"
              style={{ color: "black", fontSize: 15, marginLeft: 30 }}
            >
              <strong>Product Video</strong>
            </Typography>
          )}
          {props.product.video && (
            <Grid item className={classes.thirdColumn}>
              <Card>
                <CardMedia
                  className={classes.videoMedia}
                  component="iframe"
                  alt={props.product.name}
                  height="140"
                  src={`https://www.youtube.com/embed/${props.product.video}`}
                  //allow="autoPlay"
                  allowfullscreen="allowfullscreen"
                  controls
                />
              </Card>
            </Grid>
          )}
          {props.product.shopsAvailable && (
            <Grid item className={classes.fifthColumn}>
              <Box>
                <Typography>
                  <strong>Available in these Stores:</strong>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <ReactMarkdown>{props.product.shopsAvailable}</ReactMarkdown>
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
          <Grid item container direction="column">
            <Grid item>
              <Card>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={props.product.name}
                  image={imageUrl}
                  //   title={props.name}
                  crossOrigin="anonymous"
                />
              </Card>
            </Grid>
            <Grid item className={classes.secondRowMobile}>
              <Box>
                {props.product.configuration ? (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {props.product.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.product.configuration})</em>
                    </span>
                  </Typography>
                ) : (
                  <Typography variant="h4" color="textSecondary" component="p">
                    {props.product.name}
                  </Typography>
                )}

                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference !== "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      <span style={{ marginLeft: 50 }}>
                        <strong>
                          {getCurrencyCode()}
                          {price
                            ? price
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : 0}
                        </strong>
                      </span>
                    </Typography>
                  )}
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference === "deal" && (
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {props.product.showDealPricePerUnit ? (
                        <span style={{ marginLeft: 50 }}>
                          <strong>
                            {getCurrencyCode()}
                            {price
                              ? price
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
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference !== "deal" && (
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
                        <strong>{props.product.priceLabel}</strong>
                      </span>
                    </Typography>
                  )}
                {props.product.pricingMechanism === "pricing" &&
                  props.product.salesPreference === "deal" && (
                    <Typography
                      //variant="h6"
                      color="red"
                      component="p"
                      style={{ marginTop: 5, marginBottom: 15 }}
                    >
                      {props.product.showDealPricePerUnit ? (
                        <span
                          style={{
                            marginLeft: 50,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.product.priceLabel}</strong>
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: 50,
                            color: "red",
                            fontSize: 12,
                          }}
                        >
                          <strong>{props.product.priceLabel}</strong>
                        </span>
                      )}
                    </Typography>
                  )}
                {props.product.pricingMechanism === "request-quote" && (
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 50 }}>
                      <strong>
                        {getCurrencyCode()}
                        {price
                          ? price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : 0}
                      </strong>
                      <span style={{ fontSize: 12 }}>per unit</span>
                    </span>
                  </Typography>
                )}
                {props.product.pricingMechanism === "request-quote" && (
                  <Typography
                    //variant="h6"
                    color="red"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span
                      style={{ marginLeft: 50, color: "red", fontSize: 12 }}
                    >
                      <strong>{props.product.priceLabel}</strong>
                    </span>
                  </Typography>
                )}

                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5, marginTop: 15 }}>
                    <strong> Market Condition:</strong>
                    <span>{props.product.marketPricingCondition}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5, marginTop: 15 }}>
                    <strong> Product Type:</strong>
                    <span>{props.product.productType}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Weight per Unit:</strong>
                    <span>
                      {props.product.weightPerUnit} {props.product.unit}{" "}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5, marginTop: 20 }}>
                    <strong>MQR:</strong> &nbsp;
                    <span>
                      {
                        props.product.minimumQuantity
                        // .toString()
                        // .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      &nbsp;{" "}
                      {props.product.minimumQuantity <= 1 ? "unit" : "units"}
                    </span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Product SKU:</strong>
                    <span>{props.product.sku}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong> Sales Preference:</strong>
                    <span>{props.product.salesPreference}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong> Stock Availability:</strong>
                    <span>{props.product.stockStatus}</span>
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 5 }}>
                    <strong>Brand:</strong>
                    <span>{props.product.brand}</span>
                  </span>
                </Typography>
                {props.product.deliverability && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Deliverability:</strong>

                      <span>{props.product.deliverability}</span>
                    </span>
                  </Typography>
                )}
                {props.product.pickupInfo && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      <strong> Pickup Availability:</strong>
                      <span>{props.product.pickupInfo}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Code:</strong>
                      <span>{props.product.dealCode}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Expiry Date:</strong>
                      <span>{props.product.dealExpiryDate}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Type:</strong>
                      <span>{props.product.dealType}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Status:</strong>
                      <span>{props.product.dealStatus}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" && (
                  <Typography>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      <strong> Deal Instruction:</strong>
                      <span>{props.product.dealComment}</span>
                    </span>
                  </Typography>
                )}
                {props.product.salesPreference === "deal" &&
                  props.product.isAContributoryDeal && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong> Target Scheme Initial % Contribution:</strong>
                        <span>
                          {props.product.dealInitialPercentageContribution *
                            100}
                          %
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.isAContributoryDeal && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        <strong>
                          Maximum Allowable Contribution Installments :
                        </strong>
                        <span>
                          {props.product.dealMaximumInstallmentAllowed}
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "private" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Private Target Scheme without a Credit
                          Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "private" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === true && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Private Target Scheme with a Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "public" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Public Target Scheme without a Credit
                          Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "public" &&
                  props.product.isAContributoryDeal === true &&
                  props.product.isACreditDeal === true && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is A Public Target Scheme with a Credit Facility
                        </span>
                      </span>
                    </Typography>
                  )}
                {props.product.salesPreference === "deal" &&
                  props.product.dealType === "public" &&
                  props.product.isAContributoryDeal === false && (
                    <Typography>
                      <span style={{ fontSize: 14, marginLeft: 10 }}>
                        {/* <strong> Deal Instruction:</strong> */}
                        <span
                          style={{
                            fontSize: 14,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 700,
                          }}
                        >
                          This Is Not A Target Scheme
                        </span>
                      </span>
                    </Typography>
                  )}
              </Box>
            </Grid>
            <Grid item className={classes.thirdRowMobile}>
              <Box>
                <SendCourseToCheckoutForm
                  price={price}
                  currency={currency}
                  unit={props.product.unit}
                  minQuantity={props.product.minimumQuantity}
                  weightPerUnit={props.product.weightPerUnit}
                  productId={props.product.id}
                  categorySlug={props.categorySlug}
                  slug={props.slug}
                  category={props.category}
                  token={props.token}
                  requestQuote={props.product.requestQuote}
                  pricingMechanism={props.product.pricingMechanism}
                  allowSubscription={props.product.allowSubscription}
                  presentWeightUnitIn={props.product.presentWeightUnitIn}
                  salesPreference={props.product.salesPreference}
                  dealCode={props.product.dealCode}
                  dealType={props.product.dealType}
                  dealExpiryDate={props.product.dealExpiryDate}
                  showDealPricePerUnit={props.product.showDealPricePerUnit}
                  allowDealQuantityChange={
                    props.product.allowDealQuantityChange
                  }
                  dealStatus={props.product.dealStatus}
                  dealComment={props.product.dealComment}
                  dealDeliveryMode={props.product.dealDeliveryMode}
                  dealCentralizedDeliveryLocation={
                    props.product.dealCentralizedDeliveryLocation
                  }
                  dealCentralizedAgreedDeliveryCost={
                    props.product.dealCentralizedAgreedDeliveryCost
                  }
                  dealDecentralizedDeliveryLocation={
                    props.product.dealDecentralizedDeliveryLocation
                  }
                  dealDecentralizedAgreedDeliveryCost={
                    props.product.dealDecentralizedAgreedDeliveryCost
                  }
                  showDealDeliveryCost={props.product.showDealDeliveryCost}
                  productType={props.product.productType}
                  dealPaymentPreference={props.product.dealPaymentPreference}
                  showDealPaymentDetails={props.product.showDealPaymentDetails}
                  requestDealRedemptionCode={
                    props.product.requestDealRedemptionCode
                  }
                  isAContributoryDeal={props.product.isAContributoryDeal}
                  isACreditDeal={props.product.isACreditDeal}
                  dealOwner={props.product.dealOwner}
                  dealOwnerEntity={props.product.dealOwnerEntity}
                  dealInitialPercentageContribution={
                    props.product.dealInitialPercentageContribution
                  }
                  dealMaximumInstallmentAllowed={
                    props.product.dealMaximumInstallmentAllowed
                  }
                  includeGatewayChargesInPrice={
                    props.product.includeGatewayChargesInPrice
                  }
                  gatewayFixedCharge={props.product.gatewayFixedCharge}
                  gatewayRateCharge={props.product.gatewayRateCharge}
                  allowPriceFreezing={props.product.allowPriceFreezing}
                  isVatable={props.product.isVatable}
                  revenueMargin={props.product.revenueMargin}
                  revenueMarginShouldPrevail={
                    props.product.revenueMarginShouldPrevail
                  }
                  origins={props.product.origins}
                  userId={props.userId}
                  handleMakeOpenSignUpDialogStatus={
                    handleMakeOpenSignUpDialogStatus
                  }
                  handleMakeCloseSignUpDialogStatus={
                    handleMakeCloseSignUpDialogStatus
                  }
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleMakeCloseForgotPasswordFormDialogStatus={
                    handleMakeCloseForgotPasswordFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  handleFailedSignUpDialogOpenStatusWithSnackbar={
                    handleFailedSignUpDialogOpenStatusWithSnackbar
                  }
                  cartCounterHandler={props.cartCounterHandler}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {props.product.ingredients && (
              <Grid
                item
                className={classes.secondColumnMobile}
                style={{ marginLeft: "2%" }}
              >
                <Box>
                  <Typography>
                    <strong>Ingredients:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.ingredients}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}

            {props.product.sideEffects && (
              <Grid
                item
                className={classes.secondColumnMobile}
                style={{ marginLeft: "0.5%" }}
              >
                <Box>
                  <Typography>
                    <strong>Side Effects:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.sideEffects}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}

            {props.product.benefits && (
              <Grid
                item
                className={classes.secondColumnMobile}
                style={{ marginLeft: "0.5%" }}
              >
                <Box>
                  <Typography>
                    <strong>Benefits:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.benefits}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}
            {props.product.howToUse && (
              <Grid item className={classes.secondColumnMobile}>
                <Box>
                  <Typography>
                    <strong>How To Use:</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                    }}
                  >
                    <ReactMarkdown>{props.product.howToUse}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
          <Grid item className={classes.thirdColumnMobile}>
            <Box>
              <Typography>
                <strong>Product Description:</strong>
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "black",
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                <ReactMarkdown>{props.product.fullDescription}</ReactMarkdown>
              </Typography>
            </Box>
          </Grid>
          {props.product.testimonials && (
            <Grid item className={classes.thirdColumnMobile}>
              <Box>
                <Typography>
                  <strong>Testimonials:</strong>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <ReactMarkdown>{props.product.testimonials}</ReactMarkdown>
                </Typography>
              </Box>
            </Grid>
          )}
          {/**Images start here */}
          {images[0] && (
            <Typography
              variant="h5"
              style={{ color: "black", fontSize: 15, marginLeft: 30 }}
            >
              <strong>
                {images.length > 1 ? "Product Images" : "Product Image"}
              </strong>
            </Typography>
          )}
          <Grid
            item
            container
            direction="column"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[0] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[0]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[1] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[1]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[2] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[2]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[3] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[3]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[4] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[4]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[5] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[5]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[6] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[6]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[7] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[7]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[8] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[8]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[9] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[9]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[10] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[10]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[11] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[11]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[12] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[12]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[13] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[13]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[14] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[14]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[15] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[15]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            {images[16] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[16]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[17] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[17]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[18] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[18]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}

            {images[19] && (
              <Grid
                item
                className={classes.secondColumnImageMobile}
                style={{ marginLeft: "2%" }}
              >
                <Card>
                  <CardMedia
                    className={classes.mediaImageMobile}
                    component="img"
                    alt={props.product.name}
                    image={`${baseURL}/images/products/${images[19]}`}
                    //   title={props.name}
                    crossOrigin="anonymous"
                  />
                </Card>
              </Grid>
            )}
          </Grid>{" "}
          {/**images ends here**/}
          {/* <Grid item className={classes.forthColumnMobile}>
            <Box>
              <Typography>
                <strong>Course Content:</strong>
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "black",
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                <ReactMarkdown>{props.product.contents}</ReactMarkdown>
              </Typography>
            </Box>
          </Grid> */}
          {props.product.video && (
            <Grid item className={classes.fifthColumnMobile}>
              <Card>
                <CardMedia
                  className={classes.videoMedia}
                  component="iframe"
                  alt={props.product.name}
                  height="140"
                  src={`https://www.youtube.com/embed/${props.product.video}`}
                  //allow="autoPlay"
                  allowfullscreen="allowfullscreen"
                  controls
                />
              </Card>
            </Grid>
          )}
          {props.product.shopsAvailable && (
            <Grid item className={classes.fifthColumnMobile}>
              <Box>
                <Typography>
                  <strong>Available in these Stores:</strong>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <ReactMarkdown>{props.product.shopsAvailable}</ReactMarkdown>
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
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
