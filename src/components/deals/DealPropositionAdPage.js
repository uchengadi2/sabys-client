import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../apis/local";
import { CREATE_DEAL } from "../../actions/types";
import history from "../../history";
import theme from "../ui/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 500,
    marginLeft: "35%",
  },
  formStylesMobile: {
    width: 250,
    marginLeft: "5%",
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 180,
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
    width: 180,
    marginLeft: 90,
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
      defaultValue={defaultValue}
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

const renderEditableMultilineField = ({
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

const MAX_COUNT = 12;

function DealPropositionAdPage(props) {
  const classes = useStyles();

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const [deliveryPreference, setDeliveryPreference] = useState("pickup");

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentStatus, setPaymentStatus] = useState();

  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [customerEmailAddress, setCustomerEmailAddress] = useState();

  const [totalWeight, setTotalWeight] = useState();
  const [currency, setCurrency] = useState();
  const [currencyName, setCurrencyName] = useState("naira");
  const [productName, setProductName] = useState();
  const [sku, setSku] = useState();

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState();
  const [vendorList, setVendorList] = useState([]);
  const [vendor, setVendor] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [priceLabel, setPriceLabel] = useState();

  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState();
  const [product, setProduct] = useState({});
  const [configuration, setConfiguration] = useState();
  const [loading, setLoading] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const [proposedDealCode, setProposedDealCode] = useState(
    "DEAL-" + Math.floor(Math.random() * 1000000000000000) + "-" + "DALE"
  );
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products`);
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          name: `${product.name} (${product.sku})`,
        });
      });
      setProductList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products/${productId}`);
      const product = response.data.data.data;

      allData.push({
        id: product._id,
        name: product.name,
        imageCover: product.imageCover,
        mainImage: product.mainImage,
        images: product.images,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        pricePerUnit: product.pricePerUnit,
        category: product.category,
        currency: product.currency,
        minimumQuantity: product.minimumQuantity,
        sku: product.sku,
        unit: product.unit,
        isFeaturedProduct: product.isFeaturedProduct,
        configuration: product.configuration,
        displayOnStore: product.displayOnStore,
        salesPreference: product.salesPreference,
        keyword1: product.keyword1,
        keyword2: product.keyword2,
        keyword3: product.keyword3,
        slug: product.slug,
        allowSubscription: product.allowSubscription,
        //video: product[0].video,
        createBy: product.createBy,
        pricingMechanism: product.pricingMechanism,
        weightPerUnit: product.weightPerUnit,
        isVatable: product.isVatable,
        priceLabel: product.priceLabel,
        stockStatus: product.stockStatus,
        brand: product.brand,
        marketPricingCondition: product.marketPricingCondition,
        hasVariant: product.hasVariant,
        barcode: product.barcode,
        deliverability: product.deliverability,
        pickupInfo: product.pickupInfo,
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
      });
      setCurrency(allData[0].currency);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`, {
        params: { country: country },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/cities`, { params: { state: state } });
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/vendors`);
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies`);
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       let allData = [];
  //       api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
  //       const response = await api.get(`/currencies/${currency}`);
  //       const workingData = response.data.data.data;
  //       workingData.map((currency) => {
  //         allData.push({ id: currency._id, name: currency.name });
  //       });
  //       setCurrencyName(allData[0].name);
  //     };

  //     //call the function

  //     fetchData().catch(console.error);
  //   }, [currency]);

  //get the product list
  const renderProductList = () => {
    return productList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const handleDeliveryPreferenceChange = (event) => {
    setDeliveryPreference(event.target.value);
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

  const renderProductField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="productId"
            id="productId"
            value={productId}
            onChange={handleProductChange}
            //label="Allow Price Freezing"

            style={{
              width: matchesMDUp ? 500 : 350,
              marginTop: 20,
              height: 38,
            }}
            //{...input}
          >
            {renderProductList()}
          </Select>
          <FormHelperText>Select Product</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDeliveryPreferenceField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="deliveryPreference"
            id="deliveryPreference"
            value={deliveryPreference}
            onChange={handleDeliveryPreferenceChange}
            //label="Allow Price Freezing"

            style={{
              width: matchesMDUp ? 500 : 350,
              marginTop: 20,
              height: 38,
            }}
            //{...input}
          >
            <MenuItem value={"pickup"}>
              I will Manage The Delivery Myself
            </MenuItem>
            {/* <MenuItem value={"priority"}>Priority</MenuItem>
            <MenuItem value={"sameday"}>Sameday</MenuItem> */}
            <MenuItem value={"deliver"}>
              You Will Manage the Delivery For Me At Extra Cost
            </MenuItem>
          </Select>
          <FormHelperText>
            How Will You Have It Delivered To You?
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderSingleLineField = ({
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
        defaultValue={defaultValue}
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

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!formValues.proposedQuantity) {
      handleFailedSnackbar("Please Enter Your Proposed Quantity ");
      setLoading(false);
      return;
    }
    if (!formValues.proposedPricePerUnit) {
      handleFailedSnackbar("Please Enter Your Proposed Price Per Unit Field");
      setLoading(false);
      return;
    }

    if (!formValues.proposedDayToDelivery) {
      handleFailedSnackbar("Please Enter Your Proposed Day To Delivery");
      setLoading(false);
      return;
    }

    // if (formValues.proposedQuantity < product.minimumQuantity) {
    //   handleFailedSnackbar(
    //     "The Quantity Requested Should Not Be Lower Than The Minimum Order Quantity"
    //   );
    //   setLoading(false);
    //   return;
    // }

    if (!formValues.customerName) {
      handleFailedSnackbar("Please Complete The Customer Name Field");
      setLoading(false);
      return;
    }

    if (!formValues.customerPhoneNumber) {
      handleFailedSnackbar("Please Enter Your Phone Number Number");
      setLoading(false);
      return;
    }

    const data = {
      customerName: formValues.customerName,
      proposedQuantity: formValues.proposedQuantity,
      proposedPricePerUnit: formValues.proposedPricePerUnit,
      customerPhoneNumber: formValues.customerPhoneNumber,
      customerEmailAddress: formValues.customerEmailAddress,
      proposedDeliveryPreference: deliveryPreference,
      proposedDayToDelivery: formValues.proposedDayToDelivery,
      status: "pending",
      proposedDealCode: proposedDealCode,
      productName: product.name,
      productSku: product.sku,
      productMinimumOrderQuantity: product.minimumQuantity,
      productSalesPreference: product.salesPreference,
      productConfiguration: product.configuration,
      productPriceLabel: product.priceLabel,
      productPricePerUnit: product.pricePerUnit,
      productWeightPerUnit: product.weightPerUnit,
      productUnit: product.unit,
      product: product.id,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/deals`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_DEAL,
            payload: response.data.data.data,
          });

          history.push(`/thankyou/deals/${proposedDealCode}`);
        } else {
          handleFailedSnackbar("Something went wrong, please try again!!!");
        }
      };
      createForm().catch((err) => {
        handleFailedSnackbar("Something went wrong, please try again!!!");
        console.log("err:", err.message);
      });
    } else {
      handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  const minQuantity =
    product.minimumQuantity > 1
      ? `${product.minimumQuantity} units`
      : !product.minimumQuantity
      ? " "
      : `${product.minimumQuantity} unit`;

  const weight = !product.weightPerUnit
    ? " "
    : `${product.weightPerUnit} ${product.unit}`;

  const productPrice = `${getCurrencyCode().props.children}${
    product.pricePerUnit
      ? product.pricePerUnit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
      : 0
  }`;

  return (
    <div>
      {matchesMDUp ? (
        <form id="dealPropositionAdPage" className={classes.formStyles}>
          <Grid
            item
            container
            style={{ marginTop: 1, marginBottom: 2 }}
            justifyContent="center"
          >
            <CancelRoundedIcon
              style={{
                marginLeft: 520,
                fontSize: 30,
                marginTop: "-20px",
                cursor: "pointer",
              }}
              onClick={() => [props.handlePlaceOrderDialogOpenStatus()]}
            />
          </Grid>
          <Grid
            item
            container
            style={{ marginTop: 65 }}
            justifyContent="center"
          >
            <FormLabel
              style={{
                color: "blue",
                marginLeft: 50,
                fontWeight: 700,
                fontSize: 20,
              }}
              component="legend"
            >
              PROPOSE A DEAL
              {/* <Typography variant="h5">Propose A Deal</Typography> */}
            </FormLabel>
          </Grid>
          <Box
            sx={{
              width: 500,
              height: 420,
            }}
            noValidate
            autoComplete="off"
          >
            <Grid item container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Product Details
              </FormLabel>
            </Grid>
            <Field
              label=""
              id="product"
              name="product"
              helperText="Select a Product"
              //defaultValue={orderNumber}
              type="text"
              component={renderProductField}
              style={{ marginTop: 20 }}
            />
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: "100%" }}>
                <Field
                  label=""
                  id="productConfiguration"
                  name="productConfiguration"
                  helperText="Configuration"
                  defaultValue={product.configuration}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: 310 }}>
                <Field
                  label=""
                  id="productPricePerUnit"
                  name="productPricePerUnit"
                  helperText="Price Per Unit"
                  defaultValue={productPrice}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: 175, marginLeft: 15 }}>
                <Field
                  label=""
                  id="productMinimumOrderQuantity"
                  name="productMinimumOrderQuantity"
                  helperText="Minimum Order Quantity"
                  defaultValue={minQuantity}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>
            <Field
              label=""
              id="productPriceLabel"
              name="productPriceLabel"
              helperText="Price label"
              defaultValue={product.priceLabel}
              type="text"
              component={renderSingleLineField}
              style={{ marginTop: 20 }}
            />
            <Grid
              container
              direction="row"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Grid item style={{ marginLeft: 0, width: 310 }}>
                <Field
                  label=""
                  id="productSalesPreference"
                  name="productSalesPreference"
                  helperText="Sales Preference"
                  defaultValue={product.salesPreference}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: 175, marginLeft: 15 }}>
                <Field
                  label=""
                  id="productWeightPerUnit"
                  name="productWeightPerUnit"
                  helperText="Weight Per Unit"
                  defaultValue={weight}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>

            <Grid item container style={{ marginTop: 20, marginBotton: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Deals Detail
              </FormLabel>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "47%" }}>
                <Field
                  label=""
                  id="proposedQuantity"
                  name="proposedQuantity"
                  helperText="Enter Your Proposed Quantity"
                  //defaultValue={totalWeight}
                  type="number"
                  component={renderEditableSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: "50%", marginLeft: 10 }}>
                <Field
                  label=""
                  id="proposedPricePerUnit"
                  name="proposedPricePerUnit"
                  helperText="Propose Price Per Unit"
                  //defaultValue={deliveryMode}
                  type="number"
                  component={renderEditableSingleLineField}
                />
              </Grid>
            </Grid>
            <Field
              label=""
              id="proposedDayToDelivery"
              name="proposedDayToDelivery"
              helperText="How Soon Do You Need It(in days)?"
              //defaultValue={customerName}
              type="text"
              component={renderEditableSingleLineField}
              autoComplete="off"
              style={{ marginTop: 20 }}
            />
            <Grid item style={{ width: "100%", marginTop: 10 }}>
              <Field
                label=""
                id="proposedDeliveryPreference"
                name="proposedDeliveryPreference"
                helperText="How Will You Have It Delivered To You"
                type="text"
                component={renderDeliveryPreferenceField}
              />
            </Grid>

            <Grid item container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Customer Details
              </FormLabel>
            </Grid>

            <Field
              label=""
              id="customerName"
              name="customerName"
              helperText="Customer Name"
              //defaultValue={customerName}
              type="text"
              component={renderEditableSingleLineField}
              autoComplete="off"
              style={{ marginTop: 20 }}
            />

            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: 310 }}>
                <Field
                  label=""
                  id="customerPhoneNumber"
                  name="customerPhoneNumber"
                  helperText="Customer Phone Number"
                  //defaultValue={customerPhoneNumber}
                  type="text"
                  component={renderEditableSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: 175, marginLeft: 15 }}>
                <Field
                  label=""
                  id="customerEmailAddress"
                  name="customerEmailAddress"
                  helperText="Customer Email Address"
                  //defaultValue={customerEmailAddress}
                  type="text"
                  component={renderEditableSingleLineField}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={props.handleSubmit(onSubmit)}
              // disabled={stockAvailabilityStatus === "in-stock" ? false : true}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonContent()
              )}
            </Button>
          </Box>
        </form>
      ) : (
        <form id="dealPropositionAdPage" className={classes.formStylesMobile}>
          <Grid
            item
            container
            style={{ marginTop: 1, marginBottom: 2 }}
            justifyContent="center"
          >
            <CancelRoundedIcon
              style={{
                marginLeft: 520,
                fontSize: 30,
                marginTop: "-20px",
                cursor: "pointer",
              }}
              onClick={() => [props.handlePlaceOrderDialogOpenStatus()]}
            />
          </Grid>
          <Grid
            item
            container
            style={{ marginTop: 65 }}
            justifyContent="center"
          >
            <FormLabel
              style={{
                color: "blue",
                marginLeft: 50,
                fontWeight: 700,
                fontSize: 20,
              }}
              component="legend"
            >
              PROPOSE A DEAL
              {/* <Typography variant="h5">Propose A Deal</Typography> */}
            </FormLabel>
          </Grid>
          <Box
            sx={{
              width: 400,
              height: 420,
            }}
            noValidate
            autoComplete="off"
          >
            <Grid item container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Product Details
              </FormLabel>
            </Grid>
            <Field
              label=""
              id="product"
              name="product"
              helperText="Select a Product"
              //defaultValue={orderNumber}
              type="text"
              component={renderProductField}
              style={{ marginTop: 20 }}
            />
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: "86.5%" }}>
                <Field
                  label=""
                  id="productConfiguration"
                  name="productConfiguration"
                  helperText="Configuration"
                  defaultValue={product.configuration}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: 150 }}>
                <Field
                  label=""
                  id="productPricePerUnit"
                  name="productPricePerUnit"
                  helperText="Price Per Unit"
                  defaultValue={productPrice}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: 185, marginLeft: 15 }}>
                <Field
                  label=""
                  id="productMinimumOrderQuantity"
                  name="productMinimumOrderQuantity"
                  helperText="Minimum Order Quantity"
                  defaultValue={minQuantity}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>
            <Field
              label=""
              id="productPriceLabel"
              name="productPriceLabel"
              helperText="Price label"
              defaultValue={product.priceLabel}
              type="text"
              component={renderSingleLineField}
              style={{ marginTop: 20, width: "86.5%" }}
            />
            <Grid
              container
              direction="row"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Grid item style={{ marginLeft: 0, width: 185 }}>
                <Field
                  label=""
                  id="productSalesPreference"
                  name="productSalesPreference"
                  helperText="Sales Preference"
                  defaultValue={product.salesPreference}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: 150, marginLeft: 15 }}>
                <Field
                  label=""
                  id="productWeightPerUnit"
                  name="productWeightPerUnit"
                  helperText="Weight Per Unit"
                  defaultValue={weight}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>

            <Grid item container style={{ marginTop: 20, marginBotton: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Deals Detail
              </FormLabel>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "40%" }}>
                <Field
                  label=""
                  id="proposedQuantity"
                  name="proposedQuantity"
                  helperText="Enter Your Proposed Quantity"
                  //defaultValue={totalWeight}
                  type="number"
                  component={renderEditableSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: "45%", marginLeft: 10 }}>
                <Field
                  label=""
                  id="proposedPricePerUnit"
                  name="proposedPricePerUnit"
                  helperText="Propose Price Per Unit"
                  //defaultValue={deliveryMode}
                  type="number"
                  component={renderEditableSingleLineField}
                />
              </Grid>
            </Grid>
            <Field
              label=""
              id="proposedDayToDelivery"
              name="proposedDayToDelivery"
              helperText="How Soon Do You Need It(in days)?"
              //defaultValue={customerName}
              type="text"
              component={renderEditableSingleLineField}
              autoComplete="off"
              style={{ marginTop: 20, width: "86.5%" }}
            />
            <Grid item style={{ width: "100%", marginTop: 10 }}>
              <Field
                label=""
                id="proposedDeliveryPreference"
                name="proposedDeliveryPreference"
                helperText="How Will You Have It Delivered To You"
                type="text"
                component={renderDeliveryPreferenceField}
              />
            </Grid>

            <Grid item container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Customer Details
              </FormLabel>
            </Grid>

            <Field
              label=""
              id="customerName"
              name="customerName"
              helperText="Customer Name"
              //defaultValue={customerName}
              type="text"
              component={renderEditableSingleLineField}
              autoComplete="off"
              style={{ marginTop: 20, width: "86.5%" }}
            />

            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: 150 }}>
                <Field
                  label=""
                  id="customerPhoneNumber"
                  name="customerPhoneNumber"
                  helperText="Customer Phone Number"
                  //defaultValue={customerPhoneNumber}
                  type="text"
                  component={renderEditableSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: 185, marginLeft: 15 }}>
                <Field
                  label=""
                  id="customerEmailAddress"
                  name="customerEmailAddress"
                  helperText="Customer Email Address"
                  //defaultValue={customerEmailAddress}
                  type="text"
                  component={renderEditableSingleLineField}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className={classes.submitButtonMobile}
              onClick={props.handleSubmit(onSubmit)}
              // disabled={stockAvailabilityStatus === "in-stock" ? false : true}
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
  form: "dealPropositionAdPage",
})(DealPropositionAdPage);
