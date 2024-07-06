import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../logistic_assets/cover_image_1.png";
import { Category } from "@material-ui/icons";
import history from "../../history";
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
import CategoryProductsCard from "../CategoryProductsCard";
import TargetProductCard from "./TargetProductCard";
import UpperFooter from "../ui/UpperFooter";
import { EDIT_TARGET } from "../../actions/types";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "40vh",
    marginTop: "4em",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
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
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 1100,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    //width: 200,
    //marginLeft: 1100,
    marginLeft: 180,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function OwnCreditScheme(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  //   const [cartProductList, setCartProductList] = useState([]);
  const [targetProductList, setTargetProductList] = useState([]);
  const [cartForCheckoutList, setCartForCheckoutList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCart, setUpdateCart] = useState(false);
  const [count, setCount] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [currency, setCurrency] = useState();
  const [policy, setPolicy] = useState();
  const [salesPreference, setSalesPreference] = useState();
  const [isAContributoryDeal, setIsAContributoryDeal] = useState();
  const [dealOwner, setDealOwner] = useState();

  const dispatch = useDispatch();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const cartHolder = props.userId;

  // const renderCartUpdate = (value) => {
  //   setUpdateCart(value);
  // };

  const renderCartUpdate = () => {
    setUpdateCart((prevState) => !prevState);
  };

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/targets`, {
        params: {
          cartHolder: cartHolder,
          status: "pending",
          dealStatus: "active",
          isACreditDeal: true,
        },
      });
      const items = response.data.data.data;

      if (!items) {
        setIsLoading(false);
      }

      items.map((target) => {
        allData.push({
          id: target._id,
          product: target.product,
          cartHolder: target.cartHolder,
          dateAddedToCart: target.dateAddedToCart,
          preferredStartDate: target.preferredStartDate,
          refNumber: target.refNumber,
          quantity: target.quantity,
          minQuantity: target.minQuantity,
          price: target.price,
          weightInKg: target.weightInKg,
          isVatable: target.isVatable,
          unit: target.unit,
          weightPerUnit: target.weightPerUnit,
          salesPreference: target.salesPreference,
          dealCode: target.dealCode,
          dealExpiryDate: target.dealExpiryDate,
          allowDealQuantityChange: target.allowDealQuantityChange,
          showDealPricePerUnit: target.showDealPricePerUnit,
          dealStatus: target.dealStatus,
          dealComment: target.dealComment,
          dealDeliveryMode: target.dealDeliveryMode,
          dealCentralizedDeliveryLocation:
            target.dealCentralizedDeliveryLocation,
          dealCentralizedAgreedDeliveryCost:
            target.dealCentralizedAgreedDeliveryCost,
          dealDecentralizedDeliveryLocation:
            target.dealDecentralizedDeliveryLocation,
          dealDecentralizedAgreedDeliveryCost:
            target.dealDecentralizedAgreedDeliveryCost,
          showDealDeliveryCost: target.showDealDeliveryCost,
          productType: target.productType,
          dealType: target.dealType,
          showDealPaymentDetails: target.showDealPaymentDetails,
          dealPaymentPreference: target.dealPaymentPreference,
          requestDealRedemptionCode: target.requestDealRedemptionCode,
          isAContributoryDeal: target.isAContributoryDeal,
          dealOwner: target.dealOwner,
          dealOwnerEntity: target.dealOwnerEntity,
          amountAlreadyContributed: target.amountAlreadyContributed,
          paymentStatus: target.paymentStatus,
          dealInitialPercentageContribution:
            target.dealInitialPercentageContribution,
          dealNumberOfInstallments: target.dealNumberOfInstallments,
          includeGatewayChargesInPrice: target.includeGatewayChargesInPrice,
          gatewayFixedCharge: target.gatewayFixedCharge,
          gatewayRateCharge: target.gatewayRateCharge,
        });
      });

      if (allData.length === 0) {
        setIsLoading(false);
      }

      if (!allData) {
        setIsLoading(false);
      }
      setTargetProductList(allData);
      setSalesPreference(allData[0].salesPreference);
      setIsAContributoryDeal(allData[0].isAContributoryDeal);
      setDealOwner(allData[0].dealOwner);
      setIsLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateCart]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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

      setCurrency(allData[0].currency);
      setPolicy(allData[0]);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateCart]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const Str = require("@supercharge/strings");

  const targetList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {targetProductList.map((target, index) => (
            <TargetProductCard
              product={target.product}
              key={`${target.id}${index}`}
              cartHolder={target.cartHolder}
              targetId={target.id}
              weightInKg={target.weightInKg}
              unit={target.unit}
              weightPerUnit={target.weightPerUnit}
              isVatable={target.isVatable}
              currency={currency}
              dateAddedToCart={target.dateAddedToCart}
              preferredStartDate={target.preferredStartDate}
              cartCounterHandler={props.cartCounterHandler}
              refNumber={target.refNumber}
              quantity={target.quantity}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              renderCartUpdate={renderCartUpdate}
              renderCartUpdateAfterRemoval={props.renderCartUpdateAfterRemoval}
              salesPreference={target.salesPreference}
              dealCode={target.dealCode}
              dealExpiryDate={target.dealExpiryDate}
              allowDealQuantityChange={target.allowDealQuantityChange}
              showDealPricePerUnit={target.showDealPricePerUnit}
              dealStatus={target.dealStatus}
              dealComment={target.dealComment}
              dealDeliveryMode={target.dealDeliveryMode}
              dealCentralizedDeliveryLocation={
                target.dealCentralizedDeliveryLocation
              }
              dealCentralizedAgreedDeliveryCost={
                target.dealCentralizedAgreedDeliveryCost
              }
              dealDecentralizedDeliveryLocation={
                target.dealDecentralizedDeliveryLocation
              }
              dealDecentralizedAgreedDeliveryCost={
                target.dealDecentralizedAgreedDeliveryCost
              }
              showDealDeliveryCost={target.showDealDeliveryCost}
              productType={target.productType}
              dealType={target.dealType}
              showDealPaymentDetails={target.showDealPaymentDetails}
              dealPaymentPreference={target.dealPaymentPreference}
              requestDealRedemptionCode={target.requestDealRedemptionCode}
              dealOwner={target.dealOwner}
              amountAlreadyContributed={target.amountAlreadyContributed}
              paymentStatus={target.paymentStatus}
              isAContributoryDeal={target.isAContributoryDeal}
              dealInitialPercentageContribution={
                target.dealInitialPercentageContribution
              }
              dealNumberOfInstallments={target.dealNumberOfInstallments}
              includeGatewayChargesInPrice={target.includeGatewayChargesInPrice}
              gatewayFixedCharge={target.gatewayFixedCharge}
              gatewayRateCharge={target.gatewayRateCharge}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {targetProductList.map((target, index) => (
            <TargetProductCard
              product={target.product}
              key={`${target.id}${index}`}
              cartHolder={target.cartHolder}
              targetId={target.id}
              weightInKg={target.weightInKg}
              unit={target.unit}
              weightPerUnit={target.weightPerUnit}
              isVatable={target.isVatable}
              dateAddedToCart={target.dateAddedToCart}
              preferredStartDate={target.preferredStartDate}
              cartCounterHandler={props.cartCounterHandler}
              refNumber={target.refNumber}
              quantity={target.quantity}
              currency={currency}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              renderCartUpdate={renderCartUpdate}
              renderCartUpdateAfterRemoval={props.renderCartUpdateAfterRemoval}
              salesPreference={target.salesPreference}
              dealCode={target.dealCode}
              dealExpiryDate={target.dealExpiryDate}
              allowDealQuantityChange={target.allowDealQuantityChange}
              showDealPricePerUnit={target.showDealPricePerUnit}
              dealStatus={target.dealStatus}
              dealComment={target.dealComment}
              dealDeliveryMode={target.dealDeliveryMode}
              dealCentralizedDeliveryLocation={
                target.dealCentralizedDeliveryLocation
              }
              dealCentralizedAgreedDeliveryCost={
                target.dealCentralizedAgreedDeliveryCost
              }
              dealDecentralizedDeliveryLocation={
                target.dealDecentralizedDeliveryLocation
              }
              dealDecentralizedAgreedDeliveryCost={
                target.dealDecentralizedAgreedDeliveryCost
              }
              showDealDeliveryCost={target.showDealDeliveryCost}
              productType={target.productType}
              dealType={target.dealType}
              showDealPaymentDetails={target.showDealPaymentDetails}
              dealPaymentPreference={target.dealPaymentPreference}
              requestDealRedemptionCode={target.requestDealRedemptionCode}
              dealOwner={target.dealOwner}
              amountAlreadyContributed={target.amountAlreadyContributed}
              paymentStatus={target.paymentStatus}
              isAContributoryDeal={target.isAContributoryDeal}
              dealInitialPercentageContribution={
                target.dealInitialPercentageContribution
              }
              dealNumberOfInstallments={target.dealNumberOfInstallments}
              includeGatewayChargesInPrice={target.includeGatewayChargesInPrice}
              gatewayFixedCharge={target.gatewayFixedCharge}
              gatewayRateCharge={target.gatewayRateCharge}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  const buttonContent = () => {
    return <React.Fragment>Proceed to Checkout</React.Fragment>;
  };

  const onSubmit = () => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    // if (salesPreference === "deal" && !isAContributoryDeal) {
    //   //delete all items in this user's cart
    //   cartForCheckoutList.map((cart, index) => {
    //     const createForm = async () => {
    //       api.defaults.headers.common[
    //         "Authorization"
    //       ] = `Bearer ${props.token}`;
    //       await api.delete(`/carts/${cart.id}`);
    //       dispatch({
    //         type: DELETE_CART,
    //         //payload: response2.data.data.data,
    //       });
    //       //props.cartCounterHandler(-1);
    //     };
    //     createForm().catch((err) => {
    //       //props.handleFailedSnackbar();
    //       console.log("err:", err.message);
    //     });
    //   });
    // }

    let data = {
      status: "pending",
    };

    let allData = [];

    targetProductList.map((target) => {
      allData.push({
        id: target.id,
      });
    });

    let count;

    for (count = 0; count < allData.length; ++count) {
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.patch(
            `/targets/${allData[count].id}`,
            data
          );

          if (response.data.status === "success") {
            dispatch({
              type: EDIT_TARGET,
              payload: response.data.data.data,
            });
            //props.cartCounterHandler(-1);

            //setLoading(false);
            // setIsCheckoutVisible(true);
          } else {
            // props.handleFailedSnackbar(
            //   "Something went wrong, please try again!!!"
            // );
          }
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        //props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    }

    if (+count > 0) {
      // props.handleSuccessfulCreateSnackbar(
      //   `Please proceed to checkout page to effect payment!`
      // );
    } else {
      //props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
    setLoading(false);
    history.push(`/targets/targets`);
  };

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        {/* <Button
          variant="contained"
          className={classes.submitButton}
          onClick={onSubmit}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button> */}
        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}

        {!isLoading && targetProductList.length === 0 ? (
          <p style={{ marginTop: 20, marginLeft: 10 }}>
            There are no items in your Credit Scheme
          </p>
        ) : (
          <Grid item>{targetList}</Grid>
        )}
        {/*....INFORMATION BLOCK....*/}
      </Grid>

      {matchesMD
        ? !isLoading &&
          (targetProductList.length === 0
            ? ""
            : // <Button
              //   variant="contained"
              //   className={classes.submitButton}
              //   onClick={onSubmit}
              // >
              //   {loading ? (
              //     <CircularProgress size={30} color="inherit" />
              //   ) : (
              //     buttonContent()
              //   )}
              // </Button>
              "")
        : !isLoading &&
          // <Button
          //   variant="contained"
          //   className={classes.submitButtonMobile}
          //   onClick={onSubmit}
          // >
          //   {loading ? (
          //     <CircularProgress size={30} color="inherit" />
          //   ) : (
          //     buttonContent()
          //   )}
          // </Button>
          ""}

      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default OwnCreditScheme;
