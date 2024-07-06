import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
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
import { EDIT_DEAL } from "../../../actions/types";
import history from "../../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 500,
    marginLeft: "0%",
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

const MAX_COUNT = 12;

function ProposedDealStatusForm(props) {
  const { params, token, userId } = props;
  console.log("params:", params);
  const classes = useStyles();

  const [deliveryPreference, setDeliveryPreference] = useState(
    params[0].proposedDeliveryPreference
  );

  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [customerEmailAddress, setCustomerEmailAddress] = useState();

  const [currencyName, setCurrencyName] = useState("naira");
  const [productName, setProductName] = useState();
  const [sku, setSku] = useState();

  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState();
  const [product, setProduct] = useState({});
  const [configuration, setConfiguration] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");
  //const [isLoading, setIsLoading] = useState(false);
  const [proposedDealCode, setProposedDealCode] = useState(
    params[0].proposedDealCode
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

  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const handleDeliveryPreferenceChange = (event) => {
    setDeliveryPreference(event.target.value);
  };

  const handleProductStatusChange = (event) => {
    setStatus(event.target.value);
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

  const renderProposalDealStatusField = ({
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
            labelId="status"
            id="status"
            value={status}
            onChange={handleProductStatusChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"treated"}>Treated</MenuItem>
            <MenuItem value={"expired"}>Expired</MenuItem>
          </Select>
          <FormHelperText>Select Proposed Deal Status</FormHelperText>
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
            readOnly={true}
            style={{ width: 500, marginTop: 20, height: 38 }}
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
        inputProps={{
          readOnly: true,
        }}
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

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (status === "pending") {
      handleFailedSnackbar(
        "The status is already in PENDING state. Please select another option"
      );
      setLoading(false);
      return;
    }

    const data = {
      status: status,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/deals/${params[0].id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_DEAL,
            payload: response.data.data.data,
          });
          props.handleSuccessfulCreateSnackbar(
            `Proposed Deal, number: ${proposedDealCode} is updated successfully`
          );
          props.handleDialogOpenStatus();
          props.renderProposedDealStatusUpdateCounter();
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
    params[0].productMinimumOrderQuantity > 1
      ? `${params[0].productMinimumOrderQuantity} units`
      : !params[0].productMinimumOrderQuantity
      ? " "
      : `${params[0].productMinimumOrderQuantity} unit`;

  const weight = !params[0].productWeightPerUnit
    ? " "
    : `${params[0].productWeightPerUnit} ${params[0].productUnit}`;

  const productPrice = `${getCurrencyCode().props.children}${
    params[0].productPricePerUnit
      ? params[0].productPricePerUnit
      : //   .toFixed(2)
        //   .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        0
  }`;

  const proposedPrice = `${getCurrencyCode().props.children}${
    params[0].proposedPricePerUnit
      ? params[0].proposedPricePerUnit
      : //   .toFixed(2)
        //   .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        0
  }`;

  return (
    <div>
      <form id="proposedDealStatusForm" className={classes.formStyles}>
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
            onClick={() => [props.handleDialogOpenStatus()]}
          />
        </Grid>
        <Grid item container style={{ marginTop: 65 }} justifyContent="center">
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
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 310 }}>
              <Field
                label=""
                id="proposedDealCode"
                name="proposedDealCode"
                helperText="Proposed Deal Code"
                defaultValue={proposedDealCode}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="dateProposed"
                name="dateProposed"
                helperText="Date Proposed"
                defaultValue={params[0].dateProposed}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="product"
            name="product"
            helperText="Select a Product"
            defaultValue={params[0].productName}
            type="text"
            component={renderSingleLineField}
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "100%" }}>
              <Field
                label=""
                id="productConfiguration"
                name="productConfiguration"
                helperText="Configuration"
                defaultValue={params[0].productConfiguration}
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
            defaultValue={params[0].productPriceLabel}
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
                defaultValue={params[0].productSalesPreference}
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
                helperText="Proposed Quantity"
                defaultValue={params[0].proposedQuantity}
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
                defaultValue={proposedPrice}
                type="text"
                component={renderEditableSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="proposedDayToDelivery"
            name="proposedDayToDelivery"
            helperText="How Soon Do You Need It(in days)?"
            defaultValue={params[0].proposedDayToDelivery}
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
            defaultValue={params[0].customerName}
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
                defaultValue={params[0].customerPhoneNumber}
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
                defaultValue={params[0].customerEmailAddress}
                type="text"
                component={renderEditableSingleLineField}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Proposed Deal Status
            </FormLabel>
          </Grid>
          <Field
            label=""
            id="status"
            name="status"
            helperText="Status"
            type="text"
            component={renderProposalDealStatusField}
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
  form: "proposedDealStatusForm",
})(ProposedDealStatusForm);
