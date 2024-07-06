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
import { CREATE_TRANSACTION, CREATE_ORDER } from "../../../actions/types";

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

function PlaceOrderForm(props) {
  const classes = useStyles();

  const [deliveryMode, setDeliveryMode] = useState();

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentStatus, setPaymentStatus] = useState();

  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [customerEmailAddress, setCustomerEmailAddress] = useState();
  //   const [recipientName, setRecipientName] = useState();
  //   const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  //   const [recipientEmailAddress, setRecipientEmailAddress] = useState();
  //   const [recipientAddress, setRecipientAddress] = useState();
  //   const [nearestBusstop, setNearestBusstop] = useState();
  //   const [postalCode, setPostalCode] = useState();
  //   const [recipientCountry, setRecipientCountry] = useState();
  //   const [recipientState, setRecipientState] = useState();
  //   const [recipientCity, setRecipientCity] = useState();
  //   const [vatRate, setVatRate] = useState();
  //   const [vat, setVat] = useState();
  //
  //   const [payOnDeliveryMaxWeightInKg, setPayOnDeliveryMaxWeightInKg] =
  //     useState();
  //   const [implementVatCollection, setImplementVatCollection] = useState();
  //   const [salesTax, setSalesTax] = useState();
  //   const [revenue, setRevenue] = useState();
  //   const [allowOriginSalesTax, setAllowOriginSalesTax] = useState();
  //   const [implementSalesTaxCollection, setImplementSalesTaxCollection] =
  //     useState();

  //   const [recipientCountryName, setRecipientCountryName] = useState();
  //   const [recipientStateName, setRecipientStateName] = useState();
  //   const [recipientCityName, setRecipientCityName] = useState();
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
  const [orderNumber, setOrderNumber] = useState(
    "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "DASH"
  );

  const dispatch = useDispatch();

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

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${currency}`);
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setCurrencyName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [currency]);

  //get the vendor list
  const renderVendorList = () => {
    return vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

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

  //get the vendor list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the currency list
  const renderCurencyList = () => {
    return currencyList.map((item) => {
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

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const handleDeliveryModeChange = (event) => {
    setDeliveryMode(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const renderCategoryField = ({
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
            labelId="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ marginTop: 0, width: 310, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Product Category</FormHelperText>
        </FormControl>
      </Box>
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
            // label="Category"
            style={{ marginTop: 0, width: 160, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country</FormHelperText>
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
            // label="Category"
            style={{ marginTop: 0, width: 150, height: 38, marginLeft: 10 }}
            //{...input}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>Select State</FormHelperText>
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
            // label="Category"
            style={{ marginTop: 0, width: 150, height: 38, marginLeft: 10 }}
            //{...input}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>Select City</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCurrencyField = ({
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
            labelId="currency"
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            // label="Category"
            style={{ marginTop: 0, width: 310, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderCurencyList()}
          </Select>
          <FormHelperText>Currency</FormHelperText>
        </FormControl>
      </Box>
    );
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
            labelId="product"
            id="product"
            value={productId}
            onChange={handleProductChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            {renderProductList()}
          </Select>
          <FormHelperText>Select Product</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentStatusField = ({
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
            labelId="paymentStatus"
            id="paymentStatus"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"collect-payment-on-delivery"}>
              Payment To Be Made On Delivery
            </MenuItem>
            <MenuItem value={"paid"}>Payment Confirmed</MenuItem>
            <MenuItem value={"to-be-confirmed"}>
              Yet To Confirm Payment{" "}
            </MenuItem>
          </Select>
          <FormHelperText>Select Payment Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDeliveryModeField = ({
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
            labelId="deliveryMode"
            id="deliveryMode"
            value={deliveryMode}
            onChange={handleDeliveryModeChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            <MenuItem value={"standard"}>Standard</MenuItem>
            <MenuItem value={"priority"}>Priority</MenuItem>
            <MenuItem value={"sameday"}>Sameday</MenuItem>
            <MenuItem value={"pickup"}>Pickup</MenuItem>
          </Select>
          <FormHelperText>Select Delivery Mode</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentMethodField = ({
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
            labelId="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
            <MenuItem value={"pos"}>POS</MenuItem>
            <MenuItem value={"wallet"}>Online Wallet</MenuItem>
            <MenuItem value={"payOnDelivery"}>Pay On Delivery</MenuItem>
            <MenuItem value={"cash"}>Cash</MenuItem>
            <MenuItem value={"bank-transfer"}>Bank Tansfer</MenuItem>
            <MenuItem value={"ussd"}>USSD</MenuItem>
            <MenuItem value={"on-credit"}>On Credit</MenuItem>
          </Select>
          <FormHelperText>Select Payment Method</FormHelperText>
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
    return <React.Fragment> Place Order</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    let transWeight = 0;
    if (product.unit === "kg") {
      transWeight = product.weightPerUnit * formValues.quantityRequired;
    } else if (product.unit === "g") {
      transWeight =
        (product.weightPerUnit / 1000) * formValues.quantityRequired;
    } else if (product.unit === "ibs") {
      transWeight = product.weightPerUnit * 0.45 * formValues.quantityRequired;
    } else if (product.unit === "ibs") {
      transWeight = product.weightPerUnit * 1000 * formValues.quantityRequired;
    }

    const transData = {
      orderNumber: orderNumber,
      customerName: formValues.customerName,
      customerPhoneNumber: formValues.customerPhoneNumber,
      customerEmailAddress: formValues.customerEmailAddress,
      recipientName: formValues.recipientName,
      recipientPhoneNumber: formValues.recipientPhoneNumber,
      recipientAddress: formValues.recipientAddress,
      recipientCountry: country,
      recipientState: state,
      recipientCity: city,
      deliveryMode: deliveryMode,
      currency: currency,
      totalWeight: transWeight,
      recipientEmailAddress: formValues.recipientEmailAddress,
      totalDeliveryCost: +formValues.totalDeliveryCost
        ? +formValues.totalDeliveryCost
        : 0,
      totalProductCost:
        formValues.currentProductPricePerUnit * formValues.quantityRequired,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
      orderedBy: props.userId,
      //   recipientCountryName: countryName,
      //   recipientStateName: stateName,
      //   recipientCityName: cityName,
      deliveryStatus:
        deliveryMode === "pickup"
          ? "ready-for-picked-up"
          : "ready-for-delivery",
      shopType: "online",
    };

    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);
        if (response.data.status === "success") {
          const transId = response.data.data.data.id;

          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });
          props.handleSuccessfulPlaceOrderItemSnackbar(
            `Placement of Order, Number: ${response.data.data.data.orderNumber} is done successfully!!!`
          );
          props.renderPlaceOrderTransactionUpdateCounter();
          props.handlePlaceOrderDialogOpenStatus();
          setLoading(false);

          //post the order entry here

          const dataOrder = {
            orderNumber: orderNumber,
            transactionId: transId,
            product: product.id,
            productCategory: product.category[0].id,
            orderedPrice: +formValues.currentProductPricePerUnit,
            customerName: formValues.customerName,
            customerPhoneNumber: formValues.customerPhoneNumber,
            customerEmailAddress: formValues.customerEmailAddress,
            recipientName: formValues.recipientName,
            recipientPhoneNumber: formValues.recipientPhoneNumber,
            recipientEmailAddress: formValues.recipientEmailAddress,
            recipientAddress: formValues.recipientAddress,
            recipientCountry: country,
            recipientState: state,
            recipientCity: city,
            deliveryMode: deliveryMode,

            currency: currency,
            totalWeight: transWeight,

            totalProductCost:
              formValues.currentProductPricePerUnit *
              formValues.quantityRequired,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
            orderedBy: props.userId,
            totalDeliveryCost: +formValues.totalDeliveryCost
              ? +formValues.totalDeliveryCost
              : 0,

            orderedQuantity: +formValues.quantityRequired,

            deliveryStatus:
              deliveryMode === "pickup"
                ? "ready-for-picked-up"
                : "ready-for-delivery",
            shopType: "online",
            cartId: null,
            productVendor: null,
            quantityAdddedToCart: null,
            nearestBusstop: null,
            postalCode: null,
            dateAddedToCart: null,
            salesTax: null,
            revenue: null,
            vatRate: null,
            vat: null,
            origin: null,
            daysToDelivery: null,
          };

          // },

          //};

          if (dataOrder) {
            const createForm = async () => {
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${props.token}`;
              const response2 = await api.post(`/orders`, dataOrder);

              if (response2.data.status === "success") {
                dispatch({
                  type: CREATE_ORDER,
                  payload: response2.data.data.data,
                });

                //setLoading(false);
              } else {
                props.handleFailedSnackbar(
                  "Something went wrong, please try again!!!"
                );
              }
            };
            createForm().catch((err) => {
              //props.handleFailedSnackbar();
              console.log("err:", err.message);
            });
          } else {
            //props.handleFailedSnackbar("Something went wrong, please try again!!!");
          } //end
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
    setLoading(false);
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
      <form id="placeOrderForm" className={classes.formStyles}>
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
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Place Order</Typography>
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
                id="configuration"
                name="configuration"
                helperText="Configuration"
                defaultValue={product.configuration}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            {/* <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="category"
                name="category"
                helperText="Category"
                //defaultValue={product.category[0].name}
                type="text"
                component={renderSingleLineField}
              />
            </Grid> */}
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 310 }}>
              <Field
                label=""
                id="pricePerUnit"
                name="pricePerUnit"
                helperText="Price Per Unit"
                defaultValue={productPrice}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="minimumQuantity"
                name="minimumQuantity"
                helperText="Minimum Order Quantity"
                defaultValue={minQuantity}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="priceLabel"
            name="priceLabel"
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
                id="salesPreference"
                name="salesPreference"
                helperText="Sales Preference"
                defaultValue={product.salesPreference}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="weightPerUnit"
                name="weightPerUnit"
                helperText="Weight Per Unit"
                defaultValue={weight}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
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

          <Grid item container style={{ marginTop: 20, marginBotton: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Transaction Detail
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "47%" }}>
              <Field
                label=""
                id="quantityRequired"
                name="quantityRequired"
                helperText="Quantity Required"
                //defaultValue={totalWeight}
                type="number"
                component={renderEditableSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "50%", marginLeft: 10 }}>
              <Field
                label=""
                id="currentProductPricePerUnit"
                name="currentProductPricePerUnit"
                helperText="Agreed Product Price Per Unit"
                //defaultValue={deliveryMode}
                type="number"
                component={renderEditableSingleLineField}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Delivery & Recipient's Parameters
            </FormLabel>
          </Grid>

          <Grid item style={{ width: "100%", marginTop: 10 }}>
            <Field
              label=""
              id="deliveryMode"
              name="deliveryMode"
              helperText="Delivery Mode"
              type="text"
              component={renderDeliveryModeField}
            />
          </Grid>
          <Field
            label=""
            id="recipientName"
            name="recipientName"
            helperText="Recipient Name"
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
                id="recipientPhoneNumber"
                name="recipientPhoneNumber"
                helperText="Recipient Phone Number"
                //defaultValue={customerPhoneNumber}
                type="text"
                component={renderEditableSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="recipientEmailAddress"
                name="recipientEmailAddress"
                helperText="Recipient Email Address"
                //defaultValue={customerEmailAddress}
                type="text"
                component={renderEditableSingleLineField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="recipientAddress"
            name="recipientAddress"
            helperText="Recipoient Address"
            type="text"
            component={renderEditableMultilineField}
            style={{ marginTop: 20 }}
          />

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "30%" }}>
              <Field
                label=""
                id="recipientCountry"
                name="recipientCountry"
                //helperText="Days To Delivery"
                //defaultValue={daysToDelivery}
                type="text"
                component={renderCountryField}
              />
            </Grid>
            <Grid item style={{ width: "32%", marginLeft: 15 }}>
              <Field
                label=""
                id="recipientState"
                name="recipientState"
                //helperText="Total Product Cost"

                type="text"
                component={renderStateField}
              />
            </Grid>

            <Grid item style={{ width: "32%", marginLeft: 15 }}>
              <Field
                label=""
                id="recipientCity"
                name="recipientCity"
                //helperText="Total Delivery Cost"

                type="text"
                component={renderCityField}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <Grid item style={{ width: "100%" }}>
              <Field
                label=""
                id="totalDeliveryCost"
                name="totalDeliveryCost"
                helperText="Agreed Total Delivery Cost"
                //defaultValue={paymentMethod}
                type="number"
                component={renderEditableSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Payment Method & Status
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="paymentStatus"
            name="paymentStatus"
            //helperText="Stock Availability Status"
            type="text"
            component={renderPaymentStatusField}
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="paymentMethod"
            name="paymentMethod"
            //helperText="Stock Availability Status"
            type="text"
            component={renderPaymentMethodField}
            style={{ marginTop: 10 }}
          />

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
    </div>
  );
}

export default reduxForm({
  form: "placeOrderForm",
})(PlaceOrderForm);
