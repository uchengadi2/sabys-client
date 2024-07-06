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

const renderQuantityRequestedField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
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

const renderCustomerNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
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

const renderWhatasppNumberField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
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

const renderCustomerEmailield = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
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

function RequestQuote(props) {
  const classes = useStyles();
  const params = useParams();

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState();

  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);

  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const [deliveryPreference, setDeliveryPreference] = useState("pickup");
  const [loading, setLoading] = useState(false);
  const [addToWhatsappGroup, setAddToWhatsappGroup] = useState("no");
  const [addToEmailList, setAddToEmailList] = useState("no");
  const [quoteRequestNumber, setQuoteRequestNumber] = useState(
    "QUOTE-" + Math.floor(Math.random() * 10000000000000) + "-" + "DAL"
  );
  const [product, setProduct] = useState({});
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState();
  const [sku, setSku] = useState();
  const [configuration, setConfiguration] = useState();
  const [productName, setProductName] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
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
      const response = await api.get(`/cities`);
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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

  //get the city list
  const renderCityList = () => {
    return cityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the state list
  const renderStateList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleAddToWhatsappGroupChange = (event) => {
    setAddToWhatsappGroup(event.target.value);
  };

  const handleAddToEmailListChange = (event) => {
    setAddToEmailList(event.target.value);
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

  const renderSkuField = ({
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

  const renderMinimumOrderQuantityField = ({
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
        defaultValue={defaultValue}
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

  const renderProductNameField = ({
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
        defaultValue={defaultValue}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
          readOnly: true,
        }}

        //onChange={handleInput}
      />
    );
  };

  const renderCountryField = ({
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
            labelId="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={{
              marginTop: 0,
              width: matchesMDUp ? 280 : 350,
              height: 38,
              marginLeft: 0,
            }}
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderStateField = ({
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
            labelId="state"
            id="state"
            value={state}
            onChange={handleStateChange}
            label="State"
            style={{
              marginTop: 0,
              width: matchesMDUp ? 250 : 350,
              height: 38,
              marginLeft: matchesMDUp ? 15 : 0,
            }}
            //{...input}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>State</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCityField = ({
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
            labelId="city"
            id="city"
            value={city}
            onChange={handleCityChange}
            label="City"
            style={{
              marginTop: 0,
              width: matchesMDUp ? 220 : 350,
              height: 38,
              marginLeft: matchesMDUp ? 15 : 0,
            }}
            //{...input}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>City</FormHelperText>
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
            //label="Add me To The Email Address for Notifications"
            style={{
              width: matchesMDUp ? 800 : 350,
              marginTop: 15,
              height: 38,
              marginLeft: 0,
            }}
            //{...input}
          >
            <MenuItem value={"pickup"}>Do Not Include Delivery Cost</MenuItem>
            <MenuItem value={"deliver"}>Include Delivery Cost</MenuItem>
          </Select>
          <FormHelperText>Please Select Delivery Preference</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderWhatsappGroupField = ({
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
            labelId="addToWhatsappGroup"
            id="addToWhatsappGroup"
            value={addToWhatsappGroup}
            onChange={handleAddToWhatsappGroupChange}
            //label="Add me To Whatsapp group for Notifications?"
            style={{ width: matchesMDUp ? 400 : 350, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"no"}>No</MenuItem>
            <MenuItem value={"yes"}>Yes</MenuItem>
          </Select>
          <FormHelperText>
            Add Me To The WhatsApp Group To Receive Market Notifications
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderEmailListField = ({
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
            labelId="addToEmailList"
            id="addToEmailList"
            value={addToEmailList}
            onChange={handleAddToEmailListChange}
            //label="Add me To The Email Address for Notifications"
            style={{
              width: matchesMDUp ? 370 : 350,
              marginTop: 0,
              height: 38,
              marginLeft: matchesMDUp ? 15 : 0,
            }}
            //{...input}
          >
            <MenuItem value={"no"}>No</MenuItem>
            <MenuItem value={"yes"}>Yes</MenuItem>
          </Select>
          <FormHelperText>
            Add Me To The Email List To Receive Market Notifications
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Send Quote</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!formValues.quantityRequested) {
      handleFailedSnackbar(
        "Please Enter The Quantity You Need on The Appropriate Field"
      );
      setLoading(false);
      return;
    }

    if (!quoteRequestNumber) {
      props.handleFailedSnackbar("Please Enter The Quantity You Need");
      setLoading(false);
      return;
    }

    if (formValues.quantityRequested < minimumOrderQuantity) {
      handleFailedSnackbar(
        "The Quantity Requested Should Not Be Lower Than The Minimum Order Quantity"
      );
      setLoading(false);
      return;
    }

    if (!formValues.customerName) {
      handleFailedSnackbar("Please Complete The Customer Name Field");
      setLoading(false);
      return;
    }

    if (!formValues.whatsappNumber) {
      handleFailedSnackbar("Please Enter Your WhatsApp Number");
      setLoading(false);
      return;
    }

    const data = {
      customerName: formValues.customerName,
      quantityRequested: formValues.quantityRequested,
      whatsappNumber: formValues.whatsappNumber,
      customerEmail: formValues.customerEmail,
      deliveryPreference: deliveryPreference,
      country: deliveryPreference === "deliver" ? country : null,
      state: deliveryPreference === "deliver" ? state : null,
      city: deliveryPreference === "deliver" ? city : null,
      address: deliveryPreference === "deliver" ? formValues.address : null,
      addToWhatsappGroup: addToWhatsappGroup,
      addToEmailList: addToEmailList,
      status: "pending",
      quoteRequestNumber: quoteRequestNumber,
      productName: productName,
      sku: sku,
      minimumOrderQuantity: minimumOrderQuantity,
      product: product.id,
    };
    console.log("data:", data);

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/quotes`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_QUOTE,
            payload: response.data.data.data,
          });

          history.push(`/thankyou/quotes/${quoteRequestNumber}`);
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
                marginLeft: 350,
                fontWeight: 700,
                fontSize: 20,
              }}
              component="legend"
            >
              REQUEST A QUOTE
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
                  component={renderProductNameField}
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
                  component={renderSkuField}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item style={{ marginLeft: 0, width: "22%" }}>
                <Field
                  label=""
                  id="minimumOrderQuantity"
                  name="minimumOrderQuantity"
                  type="number"
                  defaultValue={minimumOrderQuantity}
                  helperText="Minimum Order Quantity"
                  component={renderMinimumOrderQuantityField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ marginLeft: 15, width: "22%" }}>
                <Field
                  label=""
                  id="quantityRequested"
                  name="quantityRequested"
                  type="number"
                  helperText="What Quantity Do You Need?"
                  component={renderQuantityRequestedField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ width: "51.5%", marginLeft: 15 }}>
                <Field
                  label=""
                  id="customerName"
                  name="customerName"
                  type="text"
                  helperText="Enter Your Name"
                  component={renderCustomerNameField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "50%" }}>
                <Field
                  label=""
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="text"
                  helperText=" Enter Your WhatsApp Number"
                  component={renderWhatasppNumberField}
                />
              </Grid>
              <Grid item style={{ width: "48%", marginLeft: 10 }}>
                <Field
                  label=""
                  id="customerEmail"
                  name="customerEmail"
                  helperText="Enter Your Email Address(Optional)"
                  type="text"
                  component={renderCustomerEmailield}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "50%" }}>
                <Field
                  //label=""
                  id="addToWhatsappGroup"
                  name="addToWhatsappGroup"
                  type="text"
                  component={renderWhatsappGroupField}
                />
              </Grid>
              <Grid item style={{ width: "48%", marginLeft: 10 }}>
                <Field
                  //label=""
                  id="addToEmailList"
                  name="addToEmailList"
                  type="text"
                  component={renderEmailListField}
                />
              </Grid>
            </Grid>

            <Field
              label=""
              id="deliveryPreference"
              name="deliveryPreference"
              helperText="Delivery Preference"
              type="text"
              component={renderDeliveryPreferenceField}
            />
            {deliveryPreference === "deliver" && (
              <Grid container direction="row" style={{ marginTop: 15 }}>
                <Grid item style={{ marginLeft: 0, width: "33%" }}>
                  <Field
                    label=""
                    id="country"
                    name="country"
                    type="text"
                    component={renderCountryField}
                    autoComplete="off"
                    style={{ marginTop: 15 }}
                  />
                </Grid>
                <Grid item style={{ width: "33%", marginLeft: 15 }}>
                  <Field
                    label=""
                    id="state"
                    name="state"
                    type="text"
                    component={renderStateField}
                    autoComplete="off"
                    style={{ marginTop: 20 }}
                  />
                </Grid>
                <Grid item style={{ width: "30%", marginLeft: 15 }}>
                  <Field
                    label=""
                    id="city"
                    name="city"
                    type="text"
                    component={renderCityField}
                    autoComplete="off"
                    style={{ marginTop: 20 }}
                  />
                </Grid>
              </Grid>
            )}
            {deliveryPreference === "deliver" && (
              <Field
                label=""
                id=""
                name="address"
                helperText="Your Address"
                rows={3}
                type="text"
                component={renderMultilineField}
              />
            )}
            {/* <Field
            label=""
            id=""
            name="comment"
            helperText="Any Comment?"
            rows={3}
            type="text"
            component={renderMultilineField}
          /> */}

            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={props.handleSubmit(onSubmit)}
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
        <form id="productForm" className={classes.rootMobile}>
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
              REQUEST A QUOTE
            </FormLabel>
          </Grid>
          <Box
            sx={{
              width: 350,
              marginLeft: 10,
              // height: 420,
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: "100%" }}>
                <Field
                  label=""
                  id="product"
                  name="product"
                  defaultValue={productName + "(" + configuration + ")"}
                  helperText="Product Name"
                  type="text"
                  component={renderProductNameField}
                />
              </Grid>
              <Grid item style={{ width: "100%", marginLeft: 0 }}>
                <Field
                  label=""
                  id="sku"
                  name="sku"
                  defaultValue={sku}
                  helperText="Sku"
                  type="text"
                  component={renderSkuField}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" style={{ marginTop: 10 }}>
              <Grid item style={{ marginLeft: 0, width: "100%" }}>
                <Field
                  label=""
                  id="minimumOrderQuantity"
                  name="minimumOrderQuantity"
                  type="number"
                  defaultValue={minimumOrderQuantity}
                  helperText="Minimum Order Quantity"
                  component={renderMinimumOrderQuantityField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ marginLeft: 0, width: "100%" }}>
                <Field
                  label=""
                  id="quantityRequested"
                  name="quantityRequested"
                  type="number"
                  helperText="What Quantity Do You Need?"
                  component={renderQuantityRequestedField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
              <Grid item style={{ width: "100%", marginLeft: 0 }}>
                <Field
                  label=""
                  id="customerName"
                  name="customerName"
                  type="text"
                  helperText="Enter Your Name"
                  component={renderCustomerNameField}
                  autoComplete="off"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>

            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "100%" }}>
                <Field
                  label=""
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="text"
                  helperText=" Enter Your WhatsApp Number"
                  component={renderWhatasppNumberField}
                />
              </Grid>
              <Grid item style={{ width: "100%", marginLeft: 0 }}>
                <Field
                  label=""
                  id="customerEmail"
                  name="customerEmail"
                  helperText="Enter Your Email Address(Optional)"
                  type="text"
                  component={renderCustomerEmailield}
                />
              </Grid>
            </Grid>
            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item style={{ width: "100%" }}>
                <Field
                  //label=""
                  id="addToWhatsappGroup"
                  name="addToWhatsappGroup"
                  type="text"
                  component={renderWhatsappGroupField}
                />
              </Grid>
              <Grid item style={{ width: "100%", marginLeft: 0 }}>
                <Field
                  //label=""
                  id="addToEmailList"
                  name="addToEmailList"
                  type="text"
                  component={renderEmailListField}
                />
              </Grid>
            </Grid>

            <Field
              label=""
              id="deliveryPreference"
              name="deliveryPreference"
              helperText="Delivery Preference"
              type="text"
              component={renderDeliveryPreferenceField}
            />
            {deliveryPreference === "deliver" && (
              <Grid container direction="column" style={{ marginTop: 15 }}>
                <Grid item style={{ marginLeft: 0, width: "100%" }}>
                  <Field
                    label=""
                    id="country"
                    name="country"
                    type="text"
                    component={renderCountryField}
                    autoComplete="off"
                    style={{ marginTop: 15 }}
                  />
                </Grid>
                <Grid item style={{ width: "100%", marginLeft: 0 }}>
                  <Field
                    label=""
                    id="state"
                    name="state"
                    type="text"
                    component={renderStateField}
                    autoComplete="off"
                    style={{ marginTop: 20 }}
                  />
                </Grid>
                <Grid item style={{ width: "100%", marginLeft: 0 }}>
                  <Field
                    label=""
                    id="city"
                    name="city"
                    type="text"
                    component={renderCityField}
                    autoComplete="off"
                    style={{ marginTop: 20 }}
                  />
                </Grid>
              </Grid>
            )}
            {deliveryPreference === "deliver" && (
              <Field
                label=""
                id=""
                name="address"
                helperText="Your Address"
                rows={3}
                type="text"
                component={renderMultilineField}
                style={{ width: "100%" }}
              />
            )}
            {/* <Field
            label=""
            id=""
            name="comment"
            helperText="Any Comment?"
            rows={3}
            type="text"
            component={renderMultilineField}
          /> */}

            <Button
              variant="contained"
              className={classes.submitButtonMobile}
              onClick={props.handleSubmit(onSubmit)}
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
  form: "requestform",
})(RequestQuote);
