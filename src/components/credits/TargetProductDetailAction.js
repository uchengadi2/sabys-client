import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../apis/local";
import { CREATE_ORDER, EDIT_TARGET } from "../../actions/types";
import { EDIT_CART, DELETE_CART } from "../../actions/types";

import Paystack from "../../Paystack";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 230,
    marginTop: 30,
    marginBottom: 20,
    // color: "white",
    // backgroundColor: theme.palette.common.green,
    // "&:hover": {
    //   backgroundColor: theme.palette.common.green,
    // },
  },

  submitUpdateButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginTop: 10,
    marginBottom: 15,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitDisabledUpdateButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.grey,
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
  },
  removeItem: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    marginBottom: 20,
    // color: "white",
    // backgroundColor: theme.palette.common.green,
    // "&:hover": {
    //   backgroundColor: theme.palette.common.green,
    // },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  bankDetails: {
    fontSize: 12,
    marginBottom: 4,
    padding: 10,
  },
}));

const renderRecipientNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Name"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

const renderRecipientAddressField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Address"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      multiline
      minRows={2}
    />
  );
};

const renderRecipientPhoneNumberField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Phone Number"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

const renderRequestedQuantityField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Target Quantity"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      //defaultValue={quantity}
      onChange={input.onChange}
      //   inputProps={{
      //     style: {
      //       height: 1,
      //     },

      //   }}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
          //readOnly: true,
        },
      }}
    />
  );
};

const renderDealSameQuantityField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Quantity"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      //defaultValue={quantity}
      onChange={input.onChange}
      //   inputProps={{
      //     style: {
      //       height: 1,
      //     },

      //   }}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
          readOnly: true,
        },
      }}
    />
  );
};

function TargetProductDetailAction(props) {
  const {
    price,
    productId,
    token,
    userId,
    showDealPricePerUnit,
    allowDealQuantityChange,
    salesPreference,
    amountAlreadyContributed,
    paymentStatus,
    dealInitialPercentageContribution,
    dealNumberOfInstallments,
    includeGatewayChargesInPrice,
    gatewayFixedCharge,
    gatewayRateCharge,
    currentInstallmentRound,
  } = props;
  const [quantity, setQuantity] = useState(+props.quantity);
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [cartId, setCartId] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();

  const [isVisible, setIsVisible] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [total, setTotal] = useState();
  const [orderNumber, setOrderNumber] = useState(
    "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "ES"
  );
  const [contributedAmount, setContributedAmount] = useState(0);
  // const [charges, setCharges] = useState(
  //   currentInstallmentRound === 0
  //     ? gatewayFixedCharge +
  //         gatewayRateCharge *
  //           price *
  //           quantity *
  //           dealInitialPercentageContribution
  //     : gatewayFixedCharge +
  //         gatewayRateCharge *
  //           price *
  //           quantity *
  //           (dealNumberOfInstallments > 1
  //             ? (1 - dealInitialPercentageContribution) /
  //               (dealNumberOfInstallments - 1)
  //             : dealNumberOfInstallments)
  // );

  const dispatch = useDispatch();

  const classes = useStyles();

  // const [total, setTotal] = useState(
  //   price
  //     ? (+props.quantity * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  //     : 0
  // );
  const [loading, setLoading] = useState();
  const [loadingRemoval, setLoadingRemoval] = useState();

  useEffect(() => {
    let amount = 0;

    if (dealNumberOfInstallments === 1) {
      amount =
        price * quantity +
        (gatewayFixedCharge + gatewayRateCharge * price * quantity);
    } else {
      if (currentInstallmentRound === 0) {
        if (includeGatewayChargesInPrice) {
          const roundSum =
            dealInitialPercentageContribution * (price * quantity);
          amount =
            roundSum + (gatewayFixedCharge + gatewayRateCharge * roundSum);
        } else {
          amount = dealInitialPercentageContribution * (price * quantity);
        }
      } else {
        if (includeGatewayChargesInPrice) {
          const roundSum =
            ((1 - dealInitialPercentageContribution) /
              (dealNumberOfInstallments - 1)) *
            (price * quantity);
          amount =
            roundSum + (gatewayFixedCharge + gatewayRateCharge * roundSum);
        } else {
          amount =
            ((1 - dealInitialPercentageContribution) /
              (dealNumberOfInstallments - 1)) *
            (price * quantity);
        }
      }
    }

    setContributedAmount(amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  }, [price, quantity]);

  let charges = 0;
  let amount = 0;
  if (dealNumberOfInstallments === 1) {
    charges = gatewayFixedCharge + gatewayRateCharge * price * quantity;
  } else {
    if (currentInstallmentRound === 0) {
      amount = dealInitialPercentageContribution * price * quantity;
      charges = gatewayFixedCharge + gatewayRateCharge * amount;
    } else {
      amount =
        ((1 - dealInitialPercentageContribution) * price * quantity) /
        (dealNumberOfInstallments - 1);
      charges = gatewayFixedCharge + gatewayRateCharge * amount;
    }
  }

  useEffect(() => {
    if (!price) {
      return;
    }
    if (!quantity) {
      return;
    }
    const sum = price * quantity;
    setTotal(sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  }, [price, quantity]);

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
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  //get the email address of the customer

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users/${props.userId}`);
      const user = response.data.data.data;
      allData.push({ id: user._id, name: user.name, email: user.email });
      setCustomerEmail(allData[0].email);
      setCustomerName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const onChange = (e) => {
    const quantity = parseFloat(e.target.value);
    setQuantity(quantity);
    const newTotal = quantity * parseFloat(price);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  };

  const onRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const onRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };

  const onRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value === productLocation) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setIsCheckoutVisible(false);
    setProvideDeliveryCost(true);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "card") {
      setIsOnlinePayment(true);
    } else {
      setIsOnlinePayment(false);
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  //get the state list
  const renderLocationList = () => {
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

  const renderTotalField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Total Product Cost"
        label={label}
        id={input.name}
        name={input.name}
        value={total}
        //defaultValue={total}
        fullWidth
        type={type}
        disabled
        style={{ marginTop: 10, width: 250 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
              //fontSize: "2em",
            },
          },
        }}
      />
    );
  };

  const renderAmountAlreadyContributedTotalField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    defaultValue,
    helperText,
    id,
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
        name={input.name}
        //value={total}
        defaultValue={defaultValue}
        fullWidth
        type={type}
        disabled
        style={{ marginTop: 10, width: 250 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
              //fontSize: "2em",
            },
          },
        }}
      />
    );
  };
  const renderCurrentInstallmentRoundField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    defaultValue,
    helperText,
    id,
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
        name={input.name}
        //value={total}
        defaultValue={defaultValue}
        fullWidth
        type={type}
        disabled
        style={{ marginTop: 10, width: 250 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
              //fontSize: "2em",
            },
          },
        }}
      />
    );
  };

  const renderAmountDueForContributionField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    defaultValue,
    helperText,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText={
          !includeGatewayChargesInPrice
            ? helperText
            : `${helperText} (Includes Payment Gateway charges of =N=${charges})`
        }
        label={label}
        id={input.name}
        name={input.name}
        //value={total}
        defaultValue={defaultValue}
        fullWidth
        type={type}
        disabled
        style={{ marginTop: 10, width: 250 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
              //fontSize: "2em",
            },
          },
        }}
      />
    );
  };

  const renderMinimumQuantityField = ({
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
        //value={input.value}
        fullWidth
        //required
        type={type}
        {...custom}
        defaultValue={`${props.minimumQuantity} ${
          props.minimumQuantity <= 1 ? "unit" : "units"
        }`}
        disabled
        onChange={input.onChange}
        //   inputProps={{
        //     style: {
        //       height: 1,
        //     },

        //   }}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
            },
          },
        }}
      />
    );
  };

  const renderProductCountryField = ({
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
            labelId="locationCountry"
            id="locationCountry"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={{ width: 140, marginTop: 0, height: 38 }}
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductLocationField = ({
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
            label="Location"
            style={{ width: 150, marginTop: 0, marginLeft: 30, height: 38 }}
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText style={{ marginLeft: 40 }}>
            State/Region
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCheckbox = ({ input, label }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name="SomeName"
            value="SomeValue"
            onChange={input.onChange}
          />
        }
        label={label}
      />
    );
  };

  const renderPaymentMethodField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            label="Account Type"
            style={{ height: 38, width: 300, marginTop: 10, marginLeft: 10 }}
          >
            <MenuItem value={"cheque"}>Cheque</MenuItem>
            <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
            <MenuItem value={"bank-transfer"}>Bank Transfer</MenuItem>
            <MenuItem value={"cash"}>Cash</MenuItem>
          </Select>
          <FormHelperText>Payment Method</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  let totalDeliveryCost;

  const diff = +quantity - +props.maxmumQuantityForBaselineDelivery;

  if (diff <= 0) {
    totalDeliveryCost = 0;
    // parseFloat(
    //   props.baselineDeliveryCostWithinProductLocation
    // );
  } else {
    const quantityUnitsForNonBaselineDelivery =
      parseInt(quantity) - parseInt(props.maxmumQuantityForBaselineDelivery);
    const costforNonBaselineDelivery =
      +quantityUnitsForNonBaselineDelivery *
      parseFloat(props.deliveryCostPerUnitWithinProductLocation);
    totalDeliveryCost = 0;
    // +costforNonBaselineDelivery +
    // parseFloat(props.baselineDeliveryCostWithinProductLocation);
  }

  const totalProductCost = price * quantity + totalDeliveryCost;
  const totalProductCostForDisplay = totalProductCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalDeliveryCostForDisplay = totalDeliveryCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const amountForPayment = +totalProductCost.toFixed(2) * 100;

  const removeButtonContent = () => {
    return <React.Fragment>Remove</React.Fragment>;
  };

  const buttonContent = () => {
    return <React.Fragment>Update Quantity</React.Fragment>;
  };

  //function to update product in cart

  const onItemRemovalSubmit = () => {
    setLoadingRemoval(true);
    const createForm = async () => {
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      await api.delete(`/carts/${props.cartId}`);

      props.handleSuccessfulCreateSnackbar(
        `This item is removed successfully!!!`
      );

      //history.push("/");
      props.renderCheckoutUpdate(props.cartId);

      setLoadingRemoval(false);
    };
    createForm().catch((err) => {
      props.handleFailedSnackbar();
      console.log("err:", err.message);
    });
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    if (!quantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty");
      setLoading(false);
      return;
    }

    if (quantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);
      return;
    }

    if (+quantity < +props.minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);
      return;
    }

    let data = {};

    let weightInKg = 0;

    if (props.unit === "kg") {
      weightInKg = props.weightPerUnit * quantity;
    } else if (props.unit === "g") {
      weightInKg = (props.weightPerUnit / 1000) * quantity;
    } else if (props.unit === "ibs") {
      weightInKg = props.weightPerUnit * 0.45359237 * quantity;
    } else if (props.unit === "tonnes") {
      weightInKg = props.weightPerUnit * 1000 * quantity;
    }

    data = {
      quantity: quantity,
      weightInKg: weightInKg,
      // price: props.price,
      // currency: props.currency,
      // // totalDeliveryCost: totalDeliveryCost,
      // contactMeForTheDeliveryCost: false,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/targets/${props.targetId}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_TARGET,
            payload: response.data.data.data,
          });
          //history.push("/");
          props.handleSuccessfulCreateSnackbar(
            `This item is updated successfully!!!`
          );

          setLoading(false);
          //props.renderCartUpdate(props.cartId);
          // props.renderCheckoutUpdate(props.targetId);
          props.renderCheckoutUpdate();
          //setIsCheckoutVisible(true);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  const renderOnlinePayment = (email, amount, orderNumber) => {
    const data = {
      orderNumber: orderNumber,
      product: props.productId,
      orderedPrice: props.price,
      recipientName: props.recipientName,
      recipientPhoneNumber: props.recipientPhoneNumber,
      recipientAddress: props.recipientAddress,
      recipientCountry: props.recipientCountry,
      recipientState: props.recipientState,
      productLocation: props.location,
      locationCountry: props.locationCountry,
      totalDeliveryCost: totalDeliveryCost.toFixed(2),
      totalProductCost: totalProductCost.toFixed(2),
      productVendor: props.productVendor,
      targetId: props.targetId,
      quantityAdddedToCart: props.quantity,
      orderedQuantity: quantity,
      dateAddedToCart: props.dateAddedToCart,
      productCurrency: props.currency,
      paymentMethod: paymentMethod,
      paymentStatus: "paid",

      orderedBy: props.userId,
      preferredStartDate: props.preferredStartDate,
    };
    return (
      <Paystack
        email={email}
        amount={parseInt(amount)}
        text={"Make Payment"}
        orderNumber={orderNumber}
        data={data}
        token={props.token}
        handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
        handleFailedSnackbar={props.handleFailedSnack}
      />
    );
  };

  return (
    <>
      {/* <Typography style={{ width: 300, marginTop: 15, marginLeft: 10 }}>
        Total Delivery Cost:{props.getCurrencyCode()}
        {totalDeliveryCostForDisplay}
      </Typography> */}
      {/* <Typography style={{ width: "100%", marginTop: 5, marginLeft: 10 }}>
        Quantity Requested:&nbsp;&nbsp;{quantity} &nbsp;{" "}
        {quantity <= 1 ? props.unit : props.unit + "s"}
      </Typography>
      <Typography style={{ width: "100%", marginTop: 15, marginLeft: 10 }}>
        Total Cost:{props.getCurrencyCode()}
        {total}
      </Typography> */}
      {/* <Typography
        style={{ width: 300, fontSize: 20, marginTop: 15, marginLeft: 10 }}
      >
        Total Cost:{props.getCurrencyCode()}
        {totalProductCostForDisplay}
      </Typography> */}

      {/* {renderPaymentMethodField()} */}
      {!isOnlinePayment && paymentMethod && (
        <Typography className={classes.bankDetails}>
          Bank: Ecobank; Name: E-Shield Africa Limited; Account number:
          5140090808
        </Typography>
      )}

      {/* <Button
        variant="outlined"
        className={classes.submitButton}
        onClick={onSubmit}
      >
        {loading ? (
          <CircularProgress size={30} color="inherit" />
        ) : (
          buttonContent()
        )}
      </Button>

      {isOnlinePayment &&
        renderOnlinePayment(customerEmail, amountForPayment, orderNumber)} */}

      <form id="targetProductDetailAction">
        <Box
          sx={{
            width: 200,
            //height: 450,
          }}
          noValidate
          autoComplete="off"
          className={classes.root}
        >
          <Grid
            item
            container
            style={{ marginTop: 10, marginBottom: 10 }}
            justifyContent="center"
          ></Grid>
          <Field
            label=""
            id="minimumQuantity"
            name="minimumQuantity"
            defaultValue={`${props.minimumQuantity}`}
            helperText={"Minimum Required Order Quantity"}
            type="text"
            component={renderMinimumQuantityField}
            style={{ width: 300 }}
          />
          <Field
            label=""
            id="quantity"
            name="quantity"
            defaultValue={quantity}
            type="number"
            onChange={onChange}
            component={
              salesPreference === "deal" && allowDealQuantityChange
                ? renderRequestedQuantityField
                : salesPreference !== "deal"
                ? renderRequestedQuantityField
                : renderDealSameQuantityField
            }
            style={{ width: 300, marginTop: 10, marginBottom: 0 }}
          />
          <Button
            variant="Contained"
            //component={Link}
            // to="/mobileapps"
            // to={`/checkouts/${userId}`}
            className={
              salesPreference === "deal" && allowDealQuantityChange
                ? classes.submitUpdateButton
                : salesPreference !== "deal"
                ? classes.submitUpdateButton
                : classes.submitDisabledUpdateButton
            }
            disabled={
              salesPreference === "deal" && allowDealQuantityChange
                ? false
                : salesPreference !== "deal"
                ? false
                : true
            }
            onClick={onSubmit}
          >
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button>

          <Grid container direction="row">
            <Grid item style={{ width: 50, marginTop: 10, fontSize: 25 }}>
              <span style={{ color: "grey" }}>&#8358;</span>
            </Grid>
            <Grid item style={{ marginLeft: 0, width: 150 }}>
              <Field
                label=""
                id="total"
                name="total"
                defaultValue={total}
                type="text"
                component={renderTotalField}
                style={{ width: 150 }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row">
            <Grid item style={{ width: 50, marginTop: 10, fontSize: 25 }}>
              <span style={{ color: "grey" }}>&#8358;</span>
            </Grid>
            <Grid item style={{ marginLeft: 0, width: 150 }}>
              <Field
                label=""
                id="amountAlreadyContributed"
                name="amountAlreadyContributed"
                defaultValue={
                  amountAlreadyContributed !== 0
                    ? amountAlreadyContributed
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0
                }
                type="text"
                helperText="Total Amount Already Contributed"
                component={renderAmountAlreadyContributedTotalField}
                style={{ width: 150 }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row">
            <Grid item style={{ width: 50, marginTop: 10, fontSize: 25 }}>
              {/* <span style={{ color: "grey" }}>&#8358;</span> */}
            </Grid>
            <Grid item style={{ marginLeft: 0, marginTop: 10, width: 150 }}>
              <Field
                label=""
                id="currentInstallmentRound"
                name="currentInstallmentRound"
                defaultValue={currentInstallmentRound}
                type="text"
                helperText="Previous Installment Round"
                component={renderCurrentInstallmentRoundField}
                style={{ width: 150 }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row">
            <Grid item style={{ width: 50, marginTop: 10, fontSize: 25 }}>
              <span style={{ color: "grey" }}>&#8358;</span>
            </Grid>
            <Grid item style={{ marginLeft: 0, marginTop: 10, width: 150 }}>
              <Field
                label=""
                id="contributedAmount"
                name="contributedAmount"
                defaultValue={contributedAmount}
                type="text"
                helperText="Amount Due for Contribution"
                component={renderAmountDueForContributionField}
                style={{ width: 150 }}
              />
            </Grid>
          </Grid>

          {/* <Button
            variant="Contained"
            //component={Link}
            // to="/mobileapps"
            // to={`/checkouts/${userId}`}
            className={
              salesPreference === "deal" && allowDealQuantityChange
                ? classes.submitUpdateButton
                : salesPreference !== "deal"
                ? classes.submitUpdateButton
                : classes.submitDisabledUpdateButton
            }
            disabled={
              salesPreference === "deal" && allowDealQuantityChange
                ? false
                : salesPreference !== "deal"
                ? false
                : true
            }
            onClick={onSubmit}
          >
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button> */}

          {/* <Button
            variant="outlined"
            //component={Link}
            // to="/mobileapps"
            // to={`/checkouts/${userId}`}
            className={classes.removeItem}
            onClick={onItemRemovalSubmit}
          >
            {loadingRemoval ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              removeButtonContent()
            )}
          </Button> */}
        </Box>
      </form>
      {isOnlinePayment &&
        renderOnlinePayment(customerEmail, amountForPayment, orderNumber)}
    </>
  );
}

export default reduxForm({
  form: "targetProductDetailAction",
})(TargetProductDetailAction);
