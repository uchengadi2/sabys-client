import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../../apis/local";
import { CREATE_PRODUCT, EDIT_ORDER } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 500,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 170,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  submitReadyButton: {
    borderRadius: 10,
    height: 40,
    width: 300,
    marginLeft: 130,
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

const MAX_COUNT = 12;

function UpdatePackageReadinessForm(props) {
  const { params, token, userId } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [willTreat, setWillTreat] = useState(false);

  const [cartId, setCartId] = useState(
    params[0].cartId ? params[0].cartId : null
  );
  const [transaction, setTransaction] = useState(params[0].transaction);
  const [transactionNumber, setTransactionNumber] = useState(
    params[0].transactionNumber
  );
  const [orderId, setOrderId] = useState(params[0].id);
  const [product, setProduct] = useState(params[0].product);
  const [productName, setProductName] = useState(params[0].productName);
  const [sku, setSku] = useState(params[0].sku);
  const [productCategory, setProductCategory] = useState(
    params[0].productCategory
  );
  const [productVendor, setProductVendor] = useState(params[0].productVendor);
  const [quantityAdddedToCart, setQuantityAdddedToCart] = useState(
    params[0].quantityAdddedToCart
  );
  const [orderedQuantity, setOrderedQuantity] = useState(
    params[0].orderedQuantity
  );
  const [orderedPrice, setOrderedPrice] = useState(params[0].orderedPrice);
  // const [currency, setCurrency] = useState(params[0].currency);
  const [customerName, setCustomerName] = useState(params[0].customerName);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(
    params[0].customerPhoneNumber
  );
  const [customerEmailAddress, setCustomerEmailAddress] = useState(
    params[0].customerEmailAddress
  );
  const [recipientName, setRecipientName] = useState(params[0].recipientName);
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState(
    params[0].recipientPhoneNumber
  );
  const [recipientEmailAddress, setRecipientEmailAddress] = useState(
    params[0].recipientEmailAddress
  );
  const [recipientAddress, setRecipientAddress] = useState(
    params[0].recipientAddress
  );
  const [postalCode, setPostalCode] = useState(params[0].postalCode);
  const [nearestBusstop, setNearestBusstop] = useState(
    params[0].nearestBusstop
  );
  const [recipientCountry, setRecipientCountry] = useState(
    params[0].recipientCountry
  );
  const [recipientState, setRecipientState] = useState(
    params[0].recipientState
  );
  const [recipientCity, setRecipientCity] = useState(params[0].recipientCity);
  const [dateAddedToCart, setDateAddedToCart] = useState(
    params[0].dateAddedToCart
  );
  const [orderedBy, setOrderedBy] = useState(params[0].orderedBy);
  const [paymentStatus, setPaymentStatus] = useState(params[0].paymentStatus);
  const [paymentMethod, setPaymentMethod] = useState(params[0].paymentMethod);
  const [salesTax, setSalesTax] = useState(params[0].salesTax);
  const [revenue, setRevenue] = useState(params[0].revenue);
  const [vatRate, setVatRate] = useState(params[0].vatRate);
  const [vat, setVat] = useState(params[0].vat);
  const [origin, setOrigin] = useState(params[0].origin);
  const [allowOriginSalesTax, setAllowOriginSalesTax] = useState(
    params[0].allowOriginSalesTax
  );
  const [implementSalesTaxCollection, setImplementSalesTaxCollection] =
    useState(params[0].implementSalesTaxCollection);
  const [isVatable, setIsVatable] = useState(params[0].isVatable);
  const [daysToDelivery, setDaysToDelivery] = useState(
    params[0].daysToDelivery
  );
  const [recipientCountryName, setRecipientCountryName] = useState(
    params[0].recipientCountryName
  );

  const [recipientStateName, setRecipientStateName] = useState(
    params[0].recipientStateName
  );
  const [recipientCityName, setRecipientCityName] = useState(
    params[0].recipientCityName
  );

  const [availabilityComment, setAvailabilityComment] = useState(
    params[0].availabilityComment
  );
  const [packagingReadinessStatus, setPackagingReadinessStatus] = useState(
    params[0].packagingReadinessStatus
  );
  const [orderNumber, setOrderNumber] = useState(params[0].orderNumber);
  const [currency, setCurrency] = useState(params[0].currency);
  const [currencyName, setCurrencyName] = useState(params[0].currencyName);
  const [stockAvailabilityStatus, setStockAvailabilityStatus] = useState(
    params[0].stockAvailabilityStatus
  );

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [locationList, setLocationList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [location, setLocation] = useState();
  const [inventory, setInventory] = useState();
  const [productId, setProductId] = useState(product.id);
  const [quantityInStock, setQuantityInStock] = useState("");

  const dispatch = useDispatch();

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
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      //setCategoryList(allData);
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
      //setVendorList(allData);
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
      //setCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/locations`);
      const workingData = response.data.data.data;
      workingData.map((location) => {
        allData.push({ id: location._id, name: location.name });
      });
      setLocationList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/inventories`, {
        params: {
          location: location,
          product: productId,
          batchStatus: "in-stock",
        },
      });
      const workingData = response.data.data.data;
      workingData.map((inventory) => {
        allData.push({
          id: inventory._id,
          name: inventory.batchNumber,
          remainingQuantity: inventory.remainingQuantity,
        });
      });
      setInventoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [location, productId]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/inventories/${inventory}`);
      const workingData = response.data.data.data;
      workingData.map((inventory) => {
        allData.push({
          id: inventory._id,
          name: inventory.batchNumber,
          remainingQuantity: inventory.remainingQuantity,
        });
      });
      setQuantityInStock(allData[0].remainingQuantity);
    };

    //call the function

    fetchData().catch(console.error);
  }, [inventory]);

  //get the location list
  const renderLocationList = () => {
    return locationList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the inventory list
  const renderInventoryList = () => {
    return inventoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const handleStockAvailabilityStatusChange = (event) => {
    setStockAvailabilityStatus(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleInventoryChange = (event) => {
    setInventory(event.target.value);
  };

  const renderStockAvailabilityStatusField = ({
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
            labelId="stockAvailabilityStatus"
            id="stockAvailabilityStatus"
            value={stockAvailabilityStatus}
            onChange={handleStockAvailabilityStatusChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            <MenuItem value={"not-processed"}>Not Processed</MenuItem>
            <MenuItem value={"in-stock"}>In stock</MenuItem>
            <MenuItem value={"out-of-stock"}>Out Of Stock</MenuItem>
            <MenuItem value={"incomplete-stock"}>Incomplete Stock</MenuItem>
          </Select>
          <FormHelperText>Select Stock Availability Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderLocationField = ({
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
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText>Select Location</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderInventoryField = ({
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
            labelId="inventory"
            id="inventory"
            value={inventory}
            onChange={handleInventoryChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            {renderInventoryList()}
          </Select>
          <FormHelperText>Select Inventory Batch</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderMultilineField = ({
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
        inputProps={{
          readOnly: true,
        }}
      />
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

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
  };

  console.log("payment status:", paymentStatus);

  const buttonContent = () => {
    return <React.Fragment>Ready For Packaging</React.Fragment>;
  };

  const buttonReadyContent = () => {
    return <React.Fragment>Packaging Status is Already Set</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (
      paymentStatus === "to-be-confirmed" ||
      paymentStatus === "not-processed"
    ) {
      props.handleFailedSnackbar(
        "Please you need to confirm payment before updating the Packaging status of this order"
      );
      setLoading(false);
      return;
    }

    const data = { packagingReadinessStatus: "ready" };
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/orders/${orderId}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_ORDER,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `Order Number: ${response.data.data.data.orderNumber} is ready for Packaging!!!`
          );
          props.renderOrderListUpdateUpdateCounter();
          props.handleEditDialogOpenStatus();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  return (
    <div>
      <form id="updatePackageReadinessForm" className={classes.formStyles}>
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
            onClick={() => [props.handleEditDialogOpenStatus()]}
          />
        </Grid>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Packaging Readiness Status</Typography>
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
          <Field
            label=""
            id="orderNumber"
            name="orderNumber"
            helperText="Order Number"
            defaultValue={orderNumber}
            type="text"
            component={renderSingleLineField}
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 310 }}>
              <Field
                label=""
                id="productName"
                name="productName"
                helperText="Product Name"
                defaultValue={productName}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="sku"
                name="sku"
                helperText="Sku"
                defaultValue={sku}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="configuration"
            name="configuration"
            helperText="Configuration"
            defaultValue={product.configuration}
            type="text"
            component={renderSingleLineField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Quantity & Payment Status
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="orderedQuantity"
                name="orderedQuantity"
                helperText="Quantity Requested"
                defaultValue={orderedQuantity}
                type="number"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "47%", marginLeft: 10 }}>
              <Field
                label=""
                id="price"
                name="price"
                helperText="Price Per Unit"
                defaultValue={`${getCurrencyCode().props.children}${
                  product.pricePerUnit
                    ? product.pricePerUnit
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0
                } `}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="paymentMethod"
                name="paymentMethod"
                helperText="Payment Method"
                defaultValue={paymentMethod}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "47%", marginLeft: 10 }}>
              <Field
                label=""
                id="paymentStatus"
                name="paymentStatus"
                helperText="Payment Status"
                defaultValue={paymentStatus}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Stock Availability Status
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="stockAvailabilityStatus"
            name="stockAvailabilityStatus"
            helperText="Stock Availability Status"
            defaultValue={stockAvailabilityStatus}
            type="text"
            component={renderSingleLineField}
            style={{ marginTop: 10 }}
          />

          {packagingReadinessStatus !== "ready" && (
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={props.handleSubmit(onSubmit)}
              disabled={stockAvailabilityStatus === "in-stock" ? false : true}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonContent()
              )}
            </Button>
          )}
          {packagingReadinessStatus === "ready" && (
            <Button
              variant="contained"
              className={classes.submitReadyButton}
              //onClick={props.handleSubmit(onSubmit)}
              disabled={packagingReadinessStatus === "ready" ? true : false}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonReadyContent()
              )}
            </Button>
          )}
        </Box>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "updatePackageReadinessForm",
})(UpdatePackageReadinessForm);
