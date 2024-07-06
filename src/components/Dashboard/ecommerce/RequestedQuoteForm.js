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
import { EDIT_QUOTE } from "../../../actions/types";

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
    width: 150,
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

function RequestedQuoteForm(props) {
  const { params, token, userId } = props;
  const classes = useStyles();

  const [quoteId, setQuoteId] = useState(params[0].id);

  const [quoteRequestNumber, setQuoteRequestNumber] = useState(
    params[0].quoteRequestNumber
  );
  const [customerName, setCustomerName] = useState(params[0].customerName);
  const [productName, setProductName] = useState(params[0].productName);
  const [quantityRequested, setQuantityRequested] = useState(
    params[0].quantityRequested
  );
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState(
    params[0].minimumOrderQuantity
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    params[0].whatsappNumber
  );
  const [customerEmail, setCustomerEmail] = useState(params[0].customerEmail);
  const [deliveryPreference, setDeliveryPreference] = useState(
    params[0].deliveryPreference
  );
  const [country, setCountry] = useState(params[0].country);
  const [state, setState] = useState(params[0].state);
  const [city, setCity] = useState(params[0].city);

  const [countryName, setCountryName] = useState(params[0].countryName);
  const [stateName, setStateName] = useState(params[0].stateName);
  const [cityName, setCityName] = useState(params[0].cityName);

  const [address, setAddress] = useState(params[0].address);
  const [status, setStatus] = useState(params[0].status);
  const [timeToLiveInHours, setTimeToLiveInHours] = useState(
    params[0].timeToLiveInHours
  );
  const [addToWhatsappGroup, setAddToWhatsappGroup] = useState(
    params[0].addToWhatsappGroup
  );
  const [addToEmailList, setAddToEmailList] = useState(
    params[0].addToEmailList
  );
  const [dateRequested, setDateRequested] = useState(params[0].dateRequested);
  const [comment, setComment] = useState(params[0].comment);
  const [sku, setSku] = useState(params[0].sku);
  const [configuration, setConfiguration] = useState(params[0].configuration);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleQuoteStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const renderStatusField = ({
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
            onChange={handleQuoteStatusChange}
            //label="Status"
            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"treated"}>Treated</MenuItem>
            <MenuItem value={"expired"}>Expired</MenuItem>
          </Select>
          <FormHelperText>Status</FormHelperText>
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

  const buttonContent = () => {
    return <React.Fragment> Update Status</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    const data = { status: status };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/quotes/${quoteId}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_QUOTE,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `Quotation number: ${response.data.data.data.quoteRequestNumber} is successfully treated!!!`
          );
          props.renderRequestedQuoteStatusUpdateCounter();
          props.handleDialogOpenStatus();
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
      <form id="requestedQuoteForm" className={classes.formStyles}>
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
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Request For Quotation</Typography>
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
            id="quoteRequestNumber"
            name="quoteRequestNumber"
            type="text"
            component={renderSingleLineField}
            helperText="Quotation Unique Number"
            defaultValue={quoteRequestNumber}
            autoComplete="off"
            style={{ marginTop: 20, width: "100%" }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 310 }}>
              <Field
                label=""
                id="productName"
                name="ProductName"
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
                helperText={"Sku"}
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
            defaultValue={configuration}
            type="text"
            component={renderSingleLineField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "48%" }}>
              <Field
                label=""
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                helperText={"Minimum Quantity Required"}
                defaultValue={minimumOrderQuantity}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "49%", marginLeft: 15 }}>
              <Field
                label=""
                id="quantityRequested"
                name="quantityRequested"
                helperText="Quantity Requested"
                defaultValue={quantityRequested}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="customerName"
            name="customerName"
            type="text"
            helperText={"Customer Name"}
            defaultValue={customerName}
            component={renderSingleLineField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "48%" }}>
              <Field
                label=""
                id="whatsappNumber"
                name="whatsappNumber"
                helperText={"Customer Whatsapp Number"}
                defaultValue={whatsappNumber}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "49%", marginLeft: 15 }}>
              <Field
                label=""
                id="customerEmail"
                name="customerEmail"
                helperText="Customer Email"
                defaultValue={customerEmail}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="deliveryPreference"
            name="deliveryPreference"
            type="text"
            component={renderSingleLineField}
            defaultValue={deliveryPreference}
            helperText="Delivery Preference"
            autoComplete="off"
            style={{ marginTop: 20, width: "100%" }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "48%" }}>
              <Field
                label=""
                id="addToWhatsappGroup"
                name="addToWhatsappGroup"
                helperText="Add To Whatsapp Group?"
                defaultValue={addToWhatsappGroup}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "49%", marginLeft: 15 }}>
              <Field
                label=""
                id="addToEmailList"
                name="addToEmailList"
                helperText={"Add To Email List"}
                defaultValue={addToEmailList}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          {deliveryPreference === "deliver" && (
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginLeft: 0, width: "32%" }}>
                <Field
                  label=""
                  id="countryName"
                  name="countryName"
                  helperText="Country"
                  defaultValue={countryName}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: "32%", marginLeft: 15 }}>
                <Field
                  label=""
                  id="stateName"
                  name="stateName"
                  helperText={"State"}
                  defaultValue={stateName}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
              <Grid item style={{ width: "30%", marginLeft: 15 }}>
                <Field
                  label=""
                  id="cityName"
                  name="cityName"
                  helperText={"City"}
                  defaultValue={cityName}
                  type="text"
                  component={renderSingleLineField}
                />
              </Grid>
            </Grid>
          )}

          {deliveryPreference === "deliver" && (
            <Field
              label=""
              id="address"
              name="address"
              helperText="Address"
              defaultValue={address}
              rows={4}
              type="text"
              component={renderMultilineField}
            />
          )}

          <Field
            label=""
            id="dateRequested"
            name="dateRequested"
            type="text"
            component={renderSingleLineField}
            helperText="Date Requested"
            defaultValue={dateRequested}
            autoComplete="off"
            style={{ marginTop: 20, width: "100%" }}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Update Quotation Status
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="status"
            name="status"
            type="text"
            component={renderStatusField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
            disabled={status === "pending" ? true : false}
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
  form: "requestedQuoteForm",
})(RequestedQuoteForm);
