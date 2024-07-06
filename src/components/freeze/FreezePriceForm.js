import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import ThankYou from "../thankyou/ThankYou";
import history from "../../history";
import api from "./../../apis/local";
import Paystack from "./Paystack";
import { CREATE_QUOTE } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
    marginLeft: "20%",
    marginRight: "15%",
    width: "100%",
  },
  formStyles: {
    width: 500,
    marginLeft: "25%",
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
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 350,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 120,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  firstSection: {
    width: 300,
  },
}));

const renderMultilineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  id,
  rows,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText={helperText}
      label={label}
      id={input.name}
      // value={formInput.description}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={rows}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderEditableSingleLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  defaultValue,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const MAX_COUNT = 12;

function FreezePriceForm(props) {
  const classes = useStyles();
  const params = useParams();

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(false);

  const [freezePriceNumber, setFreezePriceNumber] = useState(
    "FREEZE-" + Math.floor(Math.random() * 10000000000000) + "-" + "DALE"
  );
  const [product, setProduct] = useState({});
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState();
  const [sku, setSku] = useState();
  const [configuration, setConfiguration] = useState();
  const [productName, setProductName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [currencyName, setCurrencyName] = useState("naira");
  const [allowPayment, setAllowPayment] = useState(false);
  const [freezedQuantity, setFreezedQuantity] = useState(0);
  const [freezeDuration, setFreezeDuration] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [isLoading, setIsLoading] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const dispatch = useDispatch();

  const slug = params.slug;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products`, {
        params: { slug: slug },
      });
      const product = response.data.data.data;

      if (product.length >= 1) {
        allData.push({
          id: product[0]._id,
          name: product[0].name,
          imageCover: product[0].imageCover,
          mainImage: product[0].mainImage,
          images: product[0].images,
          shortDescription: product[0].shortDescription,
          fullDescription: product[0].fullDescription,
          pricePerUnit: product[0].pricePerUnit,
          category: product[0].category,
          currency: product[0].currency,
          minimumQuantity: product[0].minimumQuantity,
          sku: product[0].sku,
          unit: product[0].unit,
          isFeaturedProduct: product[0].isFeaturedProduct,
          configuration: product[0].configuration,
          displayOnStore: product[0].displayOnStore,
          salesPreference: product[0].salesPreference,
          keyword1: product[0].keyword1,
          keyword2: product[0].keyword2,
          keyword3: product[0].keyword3,
          slug: product[0].slug,
          allowSubscription: product[0].allowSubscription,
          //video: product[0].video,
          createBy: product[0].createBy,
          pricingMechanism: product[0].pricingMechanism,
          weightPerUnit: product[0].weightPerUnit,
          isVatable: product[0].isVatable,
          priceLabel: product[0].priceLabel,
          stockStatus: product[0].stockStatus,
          brand: product[0].brand,
          marketPricingCondition: product[0].marketPricingCondition,
          hasVariant: product[0].hasVariant,
          barcode: product[0].barcode,
          deliverability: product[0].deliverability,
          pickupInfo: product[0].pickupInfo,

          allowPriceFreezing: product[0].allowPriceFreezing,
          allowFreezedPriceLowBound: product[0].allowFreezedPriceLowBound,
          freezedPriceLowBound: product[0].freezedPriceLowBound,
          chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
            product[0].chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
          chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
            product[0].chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
          freezedPriceMaximumDurationInWeeks:
            product[0].freezedPriceMaximumDurationInWeeks,
          minimumFreezableQuantity: product[0].minimumFreezableQuantity,
          datePriceWasSet: product[0].datePriceWasSet,
        });

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
        });
        setProductName(allData[0].name);
        setMinimumOrderQuantity(allData[0].minimumQuantity);
        setSku(allData[0].sku);
        setConfiguration(allData[0].configuration);
        setIsLoading(false);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users/${props.userId}`);
      const user = response.data.data.data;
      allData.push({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
      });
      setCustomerEmail(allData[0].email);
      setCustomerName(allData[0].name);
      setCustomerPhoneNumber(allData[0].phone);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  const handleFreezedDurationChange = (e) => {
    if (product.allowFreezedPriceLowBound) {
      let charge =
        freezedQuantity *
        e.target.value *
        product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound;
      setFreezeDuration(e.target.value);
      setServiceCharge(charge);
    } else {
      let charge =
        freezedQuantity *
        e.target.value *
        product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound;
      setFreezeDuration(e.target.value);
      setServiceCharge(charge);
    }
  };

  const handleFreezedQuantityChange = (e) => {
    if (product.allowFreezedPriceLowBound) {
      let charge =
        freezeDuration *
        e.target.value *
        product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound;
      setFreezedQuantity(e.target.value);
      setServiceCharge(charge);
    } else {
      let charge =
        freezeDuration *
        e.target.value *
        product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound;
      setFreezedQuantity(e.target.value);
      setServiceCharge(charge);
    }
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

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  const renderSinglelineField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    helperText,
    defaultValue,
    id,
    rows,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText={helperText}
        label={label}
        id={input.name}
        defaultValue={defaultValue}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        //multiline={true}
        minRows={rows}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
          readOnly: true,
        }}
      />
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

  const productPrice = `${getCurrencyCode().props.children}${
    product.pricePerUnit
      ? product.pricePerUnit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
      : 0
  }`;

  const charge = `${getCurrencyCode().props.children}${
    serviceCharge
      ? serviceCharge.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
      : 0
  }`;

  const buttonContent = () => {
    return <React.Fragment> Freeze Price</React.Fragment>;
  };

  const buttonMakePaymentContent = () => {
    return <React.Fragment> Make Payment</React.Fragment>;
  };

  const amountForPayment = +serviceCharge.toFixed(2) * 100;

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!freezedQuantity) {
      handleFailedSnackbar(
        "Please Enter The Quantity Of The Product You Want To Freeze The Price"
      );
      setLoading(false);
      return;
    }

    if (freezedQuantity < product.minimumFreezableQuantity) {
      handleFailedSnackbar(
        `The Freezed Quantity You Entered Cannot Be Less Than ${product.minimumFreezableQuantity}`
      );
      setLoading(false);
      return;
    }

    if (!freezeDuration) {
      props.handleFailedSnackbar("Please Enter Your Desired Freezed Duration ");
      setLoading(false);
      return;
    }

    if (freezeDuration > product.freezedPriceMaximumDurationInWeeks) {
      props.handleFailedSnackbar(
        `The Duration You Entered Cannot be Greater Than ${product.freezedPriceMaximumDurationInWeeks}`
      );
      setLoading(false);
      return;
    }

    setAllowPayment(true);
  };

  const renderOnlinePayment = (
    email,
    amount,
    orderNumber,
    phoneNumber,
    name
  ) => {
    const data = {
      orderNumber: orderNumber,
      customerName: name,
      customerPhoneNumber: phoneNumber,
      // customerEmailAddress: customerEmail,
      // recipientName: recipientName,
      // recipientPhoneNumber: recipientPhoneNumber,
      // recipientAddress: recipientAddress,
      // nearestBusstop: nearestBusstop,
      // postalCode: postalCode,
      // recipientCountry: country,
      // recipientState: state,
      // recipientCity: city,
      // deliveryMode: deliveryMode,
      // vatRate: vatRate,
      // vat: vat,
      // currency: currency,
      // totalWeight: totalWeight,
      // payOnDeliveryMaxWeightInKg: payOnDeliveryMaxWeightInKg,
      // implementVatCollection: implementVatCollection,
      // recipientEmailAddress: customerEmail,
      // totalDeliveryCost: deliveryCost ? deliveryCost : 0,
      // totalProductCost: totalProductCost,
      // paymentMethod: paymentMethod,
      // paymentStatus: "to-be-confirmed",
      // orderedBy: userId,
      // salesTax: transactionSalesTax,
      // origin: policy.onlineOrigin,
      // implementSalesTaxCollection: policy.implementSalesTaxCollection,
      // allowOriginSalesTax: policy.allowOriginSalesTax,
      // revenue: totalRevenue,
      // commissionRate: policy.commissionRate,
      // prevailingSalesTax: originSalesTaxRate,
      // destinationSalesTax: destSalesTaxRate,
      // allowCentralCommission: policy.allowCentralCommission,

      // recipientCountryName: countryName,
      // recipientStateName: stateName,
      // recipientCityName: cityName,
      // deliveryStatus: "pending",
      // deliveryMode: deliveryMode,
      // daysToDelivery: daysToDelivery,
    };
    return (
      <Paystack
        email={email}
        amount={parseInt(amount)}
        text={"Make Payment"}
        orderNumber={orderNumber}
        data={data}
        //productList={props.productList}
        token={props.token}
        handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
        handleFailedSnackbar={props.handleFailedSnackbar}
      />
    );
  };

  return (
    <div>
      {matchesMDUp ? (
        <form id="productForm" className={classes.root}>
          <Grid
            item
            container
            style={{ marginTop: 0 }}
            //justifyContent="center"
          >
            <FormLabel
              style={{
                color: "blue",
                marginLeft: 300,
                fontWeight: 700,
                fontSize: 20,
              }}
              component="legend"
            >
              REQUEST A PRICE FREEZE
            </FormLabel>
          </Grid>
          <Box
            sx={{
              width: 800,
              // height: 420,
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: "75%" }}>
                <Field
                  label=""
                  id="product"
                  name="product"
                  defaultValue={productName + "(" + configuration + ")"}
                  helperText="Product Name"
                  type="text"
                  component={renderSinglelineField}
                />
              </Grid>
              <Grid item style={{ width: "22.5%", marginLeft: 15 }}>
                <Field
                  label=""
                  id="sku"
                  name="sku"
                  defaultValue={sku}
                  helperText="Sku"
                  type="text"
                  component={renderSinglelineField}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item style={{ marginLeft: 0, width: "32%" }}>
                <Field
                  label=""
                  id="minimumFreezableQuantity"
                  name="minimumFreezableQuantity"
                  type="number"
                  defaultValue={product.minimumFreezableQuantity}
                  helperText="Minimum Freezeable Quantity"
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ marginLeft: 15, width: "32%" }}>
                <Field
                  label=""
                  id="freezedPriceMaximumDurationInWeeks"
                  name="freezedPriceMaximumDurationInWeeks"
                  type="number"
                  helperText="Maximum Freezable Duration(in weeks)"
                  defaultValue={product.freezedPriceMaximumDurationInWeeks}
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ width: "31.5%", marginLeft: 15 }}>
                <Field
                  label=""
                  id="pricePerUnit"
                  name="pricePerUnit"
                  defaultValue={productPrice}
                  type="text"
                  helperText="The Price to be Freezed"
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item style={{ marginLeft: 0, width: "32%" }}>
                <Field
                  label=""
                  id="freezedQuantity"
                  name="freezedQuantity"
                  type="number"
                  helperText="Enter the Quantity to Freeze"
                  onChange={handleFreezedQuantityChange}
                  component={renderEditableSingleLineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ marginLeft: 15, width: "32%" }}>
                <Field
                  label=""
                  id="freezeDuration"
                  name="freezeDuration"
                  type="number"
                  onChange={handleFreezedDurationChange}
                  helperText="Enter the Freezed Duration(in weeks)"
                  component={renderEditableSingleLineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ width: "31.5%", marginLeft: 15 }}>
                <Field
                  label=""
                  id="serviceCharge"
                  name="serviceCharge"
                  type="text"
                  helperText="Freeze Service Charge"
                  defaultValue={charge}
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>

            {!allowPayment && (
              <Button
                variant="contained"
                className={classes.submitButton}
                onClick={props.handleSubmit(onSubmit)}
                disabled={true}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            )}
            {allowPayment &&
              // <Button
              //   variant="contained"
              //   className={classes.submitButton}
              //   onClick={props.handleSubmit(onSubmit)}
              // >
              //   {loading ? (
              //     <CircularProgress size={30} color="inherit" />
              //   ) : (
              //     buttonContent()
              //   )}
              // </Button>
              renderOnlinePayment(
                customerEmail,
                amountForPayment,
                freezePriceNumber,
                customerPhoneNumber,
                customerName
              )}
          </Box>
        </form>
      ) : (
        <form id="freezePriceForm" className={classes.rootMobile}>
          <Grid
            item
            container
            style={{ marginTop: 0 }}
            //justifyContent="center"
          >
            <FormLabel
              style={{
                color: "blue",
                marginLeft: 100,
                fontWeight: 700,
                fontSize: 20,
              }}
              component="legend"
            >
              Freeze Price Request
            </FormLabel>
          </Grid>
          <Box
            sx={{
              width: 400,
              marginLeft: 10,
              // height: 420,
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: "86.5%" }}>
                <Field
                  label=""
                  id="product"
                  name="product"
                  defaultValue={productName + "(" + configuration + ")"}
                  helperText="Product Name"
                  type="text"
                  component={renderSinglelineField}
                />
              </Grid>
              <Grid item style={{ width: "86.5%", marginLeft: 0 }}>
                <Field
                  label=""
                  id="sku"
                  name="sku"
                  defaultValue={sku}
                  helperText="Sku"
                  type="text"
                  component={renderSinglelineField}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" style={{ marginTop: 10 }}>
              <Grid item style={{ marginLeft: 0, width: "86.5%" }}>
                <Field
                  label=""
                  id="minimumFreezableQuantity"
                  name="minimumFreezableQuantity"
                  type="number"
                  defaultValue={product.minimumFreezableQuantity}
                  helperText="Minimum Freezeable Quantity"
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ marginLeft: 0, width: "86.5%" }}>
                <Field
                  label=""
                  id="freezedPriceMaximumDurationInWeeks"
                  name="freezedPriceMaximumDurationInWeeks"
                  type="number"
                  helperText="Maximum Freezable Duration(in weeks)"
                  defaultValue={product.freezedPriceMaximumDurationInWeeks}
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ width: "86.5%", marginLeft: 0 }}>
                <Field
                  label=""
                  id="pricePerUnit"
                  name="pricePerUnit"
                  defaultValue={productPrice}
                  type="text"
                  helperText="The Price to be Freezed"
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>

            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "86.5%" }}>
                <Field
                  label=""
                  id="freezedQuantity"
                  name="freezedQuantity"
                  type="number"
                  helperText="Enter the Quantity to Freeze"
                  onChange={handleFreezedQuantityChange}
                  component={renderEditableSingleLineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ width: "86.5%", marginLeft: 0 }}>
                <Field
                  label=""
                  id="freezeDuration"
                  name="freezeDuration"
                  type="number"
                  onChange={handleFreezedDurationChange}
                  helperText="Enter the Freezed Duration(in weeks)"
                  component={renderEditableSingleLineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "86.5%" }}>
                <Field
                  label=""
                  id="serviceCharge"
                  name="serviceCharge"
                  type="text"
                  helperText="Freeze Service Charge"
                  defaultValue={charge}
                  component={renderSinglelineField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className={classes.submitButtonMobile}
              onClick={props.handleSubmit(onSubmit)}
              disabled={true}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonContent()
              )}
            </Button>
          </Box>
        </form>
      )}
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
    </div>
  );
}

export default reduxForm({
  form: "freezePriceForm",
})(FreezePriceForm);
