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
import { EDIT_TRANSACTION } from "../../../actions/types";

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
    width: 100,
    marginLeft: 200,
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
      style={{ marginTop: 10 }}
      multiline={true}
      minRows={rows}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const MAX_COUNT = 12;

function RejectTransactionForm(props) {
  const { params, token, userId } = props;
  const classes = useStyles();
  const [transactionId, setTransactionId] = useState(params[0].id);
  const [orderNumber, setOrderNumber] = useState(params[0].orderNumber);
  const [totalProductCost, setTotalProductCost] = useState(
    params[0].totalProductCost
  );
  const [totalDeliveryCost, setTotalDeliveryCost] = useState(
    params[0].totalDeliveryCost
  );
  const [expectedAmount, setExpectedAmount] = useState(
    +params[0].totalProductCost + params[0].totalDeliveryCost
  );
  const [transactionDate, setTransactionDate] = useState(
    params[0].transactionDate
  );
  const [status, setStatus] = useState(params[0].status);
  const [shopType, setShopType] = useState(params[0].shopType);
  const [deliveryStatus, setDeliveryStatus] = useState(
    params[0].deliveryStatus
  );
  const [deliveryMode, setDeliveryMode] = useState(params[0].deliveryMode);

  const [daysToDelivery, setDaysToDelivery] = useState(
    params[0].daysToDelivery
  );
  const [paymentMethod, setPaymentMethod] = useState(params[0].paymentMethod);
  const [paymentStatus, setPaymentStatus] = useState(params[0].paymentStatus);
  const [rejectionReason, setRejectionReason] = useState(
    params[0].rejectionReason
  );
  const [customerName, setCustomerName] = useState(params[0].customerName);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(
    params[0].customerPhoneNumber
  );
  const [customerEmailAddress, setCustomerEmailAddress] = useState(
    params[0].customerEmailAddress
  );

  const [totalWeight, setTotalWeight] = useState(params[0].totalWeight);
  const [currency, setCurrency] = useState();
  const [currencyName, setCurrencyName] = useState(params[0].currencyName);
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
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
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

            style={{ width: 500, marginTop: 20, height: 38 }}
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
    return <React.Fragment> Reject</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    const data = {
      status: "rejected",
      rejectedBy: props.userId,
      reasonForRejection: formValues.reasonForRejection,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(
          `/transactions/${transactionId}`,
          data
        );

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_TRANSACTION,
            payload: response.data.data.data,
          });

          props.handleSuccessfulRejectedItemSnackbar(
            `Transaction Number: ${response.data.data.data.orderNumber} is rejected!!!`
          );
          props.renderTransactionRejectedUpdateCounter();
          props.handleEditRejectDialogOpenStatus();
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
      <form id="rejectTransactionForm" className={classes.formStyles}>
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
            onClick={() => [props.handleEditRejectDialogOpenStatus()]}
          />
        </Grid>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Reject Transaction</Typography>
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
            <Grid item style={{ marginLeft: 0, width: "100%" }}>
              <Field
                label=""
                id="transactionDate"
                name="transactionDate"
                helperText="Transaction Date"
                defaultValue={transactionDate}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            {/* <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="status"
                name="status"
                helperText="Status"
                defaultValue={status}
                type="text"
                component={renderSingleLineField}
              />
            </Grid> */}
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 310 }}>
              <Field
                label=""
                id="shopType"
                name="shopType"
                helperText="Transaction Platform"
                defaultValue={shopType}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
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
            defaultValue={customerName}
            type="text"
            component={renderSingleLineField}
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
                defaultValue={customerPhoneNumber}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="customerEmailAddress"
                name="customerEmailAddress"
                helperText="Customer Email Address"
                defaultValue={customerEmailAddress}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Transaction Detail
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="totalWeight"
                name="totalWeight"
                helperText="Total Weight in Kg"
                defaultValue={totalWeight}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "47%", marginLeft: 10 }}>
              <Field
                label=""
                id="deliveryMode"
                name="deliveryMode"
                helperText="Delivery Mode"
                defaultValue={deliveryMode}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "30%" }}>
              <Field
                label=""
                id="daysToDelivery"
                name="daysToDelivery"
                helperText="Days To Delivery"
                defaultValue={daysToDelivery}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "32%", marginLeft: 15 }}>
              <Field
                label=""
                id="totalProductCost"
                name="totalProductCost"
                helperText="Total Product Cost"
                defaultValue={`${getCurrencyCode().props.children}${
                  totalProductCost
                    ? totalProductCost
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0
                } `}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>

            <Grid item style={{ width: "32%", marginLeft: 15 }}>
              <Field
                label=""
                id="totalDeliveryCost"
                name="totalDeliveryCost"
                helperText="Total Delivery Cost"
                defaultValue={`${getCurrencyCode().props.children}${
                  totalDeliveryCost
                    ? totalDeliveryCost
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0
                } `}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="expectedAmount"
            name="expectedAmount"
            helperText="Total Expected Amount"
            defaultValue={`${getCurrencyCode().props.children}${
              expectedAmount
                ? expectedAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                : 0
            } `}
            type="text"
            component={renderSingleLineField}
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "100%" }}>
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
          </Grid>

          <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Delivery & Payment Status
            </FormLabel>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="paymentStatus"
                name="paymentStatus"
                helperText="Payment Status"
                defaultValue={paymentStatus}
                type="text"
                component={renderSingleLineField}
                //style={{ marginTop: 10 }}
              />
            </Grid>
            <Grid item style={{ width: "48%", marginLeft: 10 }}>
              <Field
                label=""
                id="deliveryStatus"
                name="deliveryStatus"
                helperText="Delivery Status"
                defaultValue={deliveryStatus}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Reason For Rejection
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="reasonForRejection"
            name="reasonForRejection"
            helperText="Reason For Rejection"
            type="text"
            component={renderEditableMultilineField}
          />

          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
            disabled={paymentStatus !== "paid" ? false : true}
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
  form: "rejectTransactionForm",
})(RejectTransactionForm);
