import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../../apis/local";
import { EDIT_CITY } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 200,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderSingleField = ({
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
      defaultValue={defaultValue}
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

const renderReadOnlySingleField = ({
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

const renderMultilineField = ({
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
      minRows={5}
      {...custom}
      onChange={input.onChange}

      // onChange={handleInput}
    />
  );
};

const renderReadOnlyMultilineField = ({
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
      minRows={5}
      inputProps={{
        readOnly: true,
      }}
      {...custom}
      onChange={input.onChange}

      // onChange={handleInput}
    />
  );
};

function AddShipRateForm(props) {
  const { params, token, userId } = props;
  const classes = useStyles();
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState(params[0].stateName);
  const [countryName, setCountryName] = useState(params[0].countryName);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [placeType, setPlaceType] = useState(params[0].placeType);
  const [allowSameDayDelivery, setAllowSameDayDelivery] = useState(
    params[0].allowSameDayDelivery
  );
  const [allowStandardDelivery, setAllowStandardDelivery] = useState(
    params[0].allowStandardDelivery
  );
  const [allowPriorityDelivery, setAllowPriorityDelivery] = useState(
    params[0].allowPriorityDelivery
  );
  const [allowPickUpDelivery, setAllowPickUpDelivery] = useState(
    params[0].allowPickUpDelivery
  );
  const [allowPayOnDelivery, setAllowPayOnDelivery] = useState(
    params[0].allowPayOnDelivery
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/countries");
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

  const handlePlaceTypeChange = (event) => {
    setPlaceType(event.target.value);
  };

  const handleAllowSameDayDeliveryChange = (event) => {
    setAllowSameDayDelivery(event.target.value);
  };

  const handleAllowPickUpDeliveryChange = (event) => {
    setAllowPickUpDelivery(event.target.value);
  };

  const handleAllowStandardDeliveryChange = (event) => {
    setAllowStandardDelivery(event.target.value);
  };

  const handleAllowPriorityDeliveryChange = (event) => {
    setAllowPriorityDelivery(event.target.value);
  };

  const handleAllowPayOnDeliveryChange = (event) => {
    setAllowPayOnDelivery(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setStateList([]);
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

  const renderAllowStandardDeliveryField = ({
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
            labelId="allowStandardDelivery"
            id="allowStandardDelivery"
            value={allowStandardDelivery}
            onChange={handleAllowStandardDeliveryChange}
            //label="Allow Price Freezing"

            style={{ width: 225, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Standard Delivery?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowSameDayDeliveryField = ({
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
            labelId="allowSameDayDelivery"
            id="allowSameDayDelivery"
            value={allowSameDayDelivery}
            onChange={handleAllowSameDayDeliveryChange}
            //label="Allow Price Freezing"

            style={{ width: 225, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Same Day Delivery?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowPriorityDeliveryField = ({
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
            labelId="allowPriorityDelivery"
            id="allowPriorityDelivery"
            value={allowPriorityDelivery}
            onChange={handleAllowPriorityDeliveryChange}
            //label="Allow Price Freezing"

            style={{ width: 225, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Priority Delivery?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowPickupDeliveryField = ({
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
            labelId="allowPickUpDelivery"
            id="allowPickUpDelivery"
            value={allowPickUpDelivery}
            onChange={handleAllowPickUpDeliveryChange}
            //label="Allow Price Freezing"

            style={{ width: 235, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Pickup Delivery?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowPayOnDeliveryDeliveryField = ({
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
            labelId="allowPayOnDelivery"
            id="allowPayOnDelivery"
            value={allowPayOnDelivery}
            onChange={handleAllowPayOnDeliveryChange}
            //label="Allow Price Freezing"

            style={{ width: 248, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Pay On Delivery?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    const data = {
      baseDeliveryWeight: formValues.baseDeliveryWeight
        ? formValues.baseDeliveryWeight
        : params[0].baseDeliveryWeight,
      allowSameDayDelivery: allowSameDayDelivery
        ? allowSameDayDelivery
        : params[0].allowSameDayDelivery,
      daysToSameDayDelivery: formValues.daysToSameDayDelivery
        ? formValues.daysToSameDayDelivery
        : params[0].daysToSameDayDelivery,
      baseDeliverySameDayRate: formValues.baseDeliverySameDayRate
        ? formValues.baseDeliverySameDayRate
        : params[0].baseDeliverySameDayRate,
      extraKgDeliverySameDayRate: formValues.extraKgDeliverySameDayRate
        ? formValues.extraKgDeliverySameDayRate
        : params[0].extraKgDeliverySameDayRate,
      allowStandardDelivery: allowStandardDelivery
        ? allowStandardDelivery
        : params[0].allowStandardDelivery,
      daysToStandardDelivery: formValues.daysToStandardDelivery
        ? formValues.daysToStandardDelivery
        : params[0].daysToStandardDelivery,
      baseDeliveryStandardRate: formValues.baseDeliveryStandardRate
        ? formValues.baseDeliveryStandardRate
        : params[0].baseDeliveryStandardRate,
      extraKgDeliveryStandardRate: formValues.extraKgDeliveryStandardRate
        ? formValues.extraKgDeliveryStandardRate
        : params[0].extraKgDeliveryStandardRate,
      allowPriorityDelivery: allowPriorityDelivery
        ? allowPriorityDelivery
        : params[0].allowPriorityDelivery,
      daysToPriorityDelivery: formValues.daysToPriorityDelivery
        ? formValues.daysToPriorityDelivery
        : params[0].daysToPriorityDelivery,
      baseDeliveryPriorityRate: formValues.baseDeliveryPriorityRate
        ? formValues.baseDeliveryPriorityRate
        : params[0].baseDeliveryPriorityRate,
      extraKgDeliveryPriorityRate: formValues.extraKgDeliveryPriorityRate
        ? formValues.extraKgDeliveryPriorityRate
        : params[0].extraKgDeliveryPriorityRate,
      allowPickUpDelivery: allowPickUpDelivery
        ? allowPickUpDelivery
        : params[0].allowPickUpDelivery,
      allowPayOnDelivery: allowPayOnDelivery
        ? allowPayOnDelivery
        : params[0].allowPayOnDelivery,
      payOnDeliveryMaxWeightInKg: formValues.payOnDeliveryMaxWeightInKg
        ? formValues.payOnDeliveryMaxWeightInKg
        : params[0].payOnDeliveryMaxWeightInKg,
    };
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/cities/${params[0].id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_CITY,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} City/Place Shipping Parameters are updated successfully!!!`
          );
          props.renderShiipingRateUpdateCounter();
          props.handleEditDialogOpenStatus();
          setLoading(false);
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

  return (
    <div className={classes.root}>
      <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 470,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleEditDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Add/Update Shipping Rate
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="shiprateForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 450,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Grid container direction="row">
          <Grid item style={{ width: "65%" }}>
            <Field
              label=""
              id="name"
              name="name"
              helperText={"City/Place Name"}
              defaultValue={params[0].name}
              type="text"
              component={renderReadOnlySingleField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10, marginTop: 0 }}>
            <Field
              label=""
              id="code"
              name="code"
              helperText={"City/Place Code"}
              defaultValue={params[0].code}
              type="text"
              component={renderReadOnlySingleField}
            />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item style={{ width: "45%" }}>
            <Field
              label=""
              id="country"
              name="country"
              helperText={"Country"}
              defaultValue={countryName}
              type="text"
              component={renderReadOnlySingleField}
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "53%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="state"
              name="state"
              helperText={"State"}
              defaultValue={stateName}
              type="text"
              component={renderReadOnlySingleField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="placeType"
          name="placeType"
          helperText={"City/Place Type"}
          defaultValue={params[0].placeType}
          type="text"
          component={renderReadOnlySingleField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="description"
          name="description"
          helperText="City/Place Description"
          defaultValue={params[0].description}
          type="text"
          component={renderReadOnlyMultilineField}
        />
        <Grid item container style={{ marginTop: 20 }}>
          <FormLabel style={{ color: "blue" }} component="legend">
            City/Place Shipping Rate Parameters
          </FormLabel>
        </Grid>

        <Field
          label=""
          id="baseDeliveryWeight"
          name="baseDeliveryWeight"
          helperText={"Enter Base Delivery Weight(in kg)"}
          defaultValue={params[0].baseDeliveryWeight}
          type="number"
          component={renderSingleField}
          style={{ marginTop: 10 }}
        />

        <Grid container direction="row">
          <Grid item style={{ width: "44%" }}>
            <Field
              label=""
              id="allowSameDayDelivery"
              name="allowSameDayDelivery"
              type="text"
              component={renderAllowSameDayDeliveryField}
              //style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "54%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="daysToSameDayDelivery"
              name="daysToSameDayDelivery"
              helperText={"Enter the number of Days for Same Day Delivery"}
              defaultValue={params[0].daysToSameDayDelivery}
              type="text"
              component={renderSingleField}
            />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item style={{ width: "45%" }}>
            <Field
              label=""
              id="baseDeliverySameDayRate"
              name="baseDeliverySameDayRate"
              defaultValue={params[0].baseDeliverySameDayRate}
              helperText={"Enter Same Day Delivery Base Rate"}
              type="number"
              component={renderSingleField}
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "53%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="extraKgDeliverySameDayRate"
              name="extraKgDeliverySameDayRate"
              defaultValue={params[0].extraKgDeliverySameDayRate}
              helperText={"Enter the rate on extra kg for Same Day Delivery"}
              type="number"
              component={renderSingleField}
            />
          </Grid>
        </Grid>

        {/**Standard  Delivery */}

        <Grid container direction="row">
          <Grid item style={{ width: "44%" }}>
            <Field
              label=""
              id="allowStandardDelivery"
              name="allowStandardDelivery"
              type="text"
              component={renderAllowStandardDeliveryField}
              //style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "54%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="daysToStandardDelivery"
              name="daysToStandardDelivery"
              helperText={"Enter the number of Days for Standard Delivery"}
              type="text"
              defaultValue={params[0].daysToStandardDelivery}
              component={renderSingleField}
            />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item style={{ width: "45%" }}>
            <Field
              label=""
              id="baseDeliveryStandardRate"
              name="baseDeliveryStandardRate"
              defaultValue={params[0].baseDeliveryStandardRate}
              helperText={"Enter Standard Delivery Base Rate"}
              type="number"
              component={renderSingleField}
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "53%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="extraKgDeliveryStandardRate"
              name="extraKgDeliveryStandardRate"
              defaultValue={params[0].extraKgDeliveryStandardRate}
              helperText={"Enter the rate on extra kg for Standard Delivery"}
              type="number"
              component={renderSingleField}
            />
          </Grid>
        </Grid>

        {/**Priority  Delivery */}
        <Grid container direction="row">
          <Grid item style={{ width: "44%" }}>
            <Field
              label=""
              id="allowPriorityDelivery"
              name="allowPriorityDelivery"
              type="text"
              component={renderAllowPriorityDeliveryField}
              //style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "54%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="daysToPriorityDelivery"
              name="daysToPriorityDelivery"
              helperText={"Enter the number of Days for Priority Delivery"}
              defaultValue={params[0].daysToPriorityDelivery}
              type="text"
              component={renderSingleField}
            />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item style={{ width: "45%" }}>
            <Field
              label=""
              id="baseDeliveryPriorityRate"
              name="baseDeliveryPriorityRate"
              defaultValue={params[0].baseDeliveryPriorityRate}
              helperText={"Enter Priority Delivery Base Rate"}
              type="number"
              component={renderSingleField}
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "53%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="extraKgDeliveryPriorityRate"
              name="extraKgDeliveryPriorityRate"
              defaultValue={params[0].extraKgDeliveryPriorityRate}
              helperText={"Enter the rate on extra kg for Priority Delivery"}
              type="number"
              component={renderSingleField}
            />
          </Grid>
        </Grid>

        {/**Pickup Delivery */}
        <Grid container direction="row">
          <Grid item style={{ width: "48%" }}>
            <Field
              label=""
              id="allowPickUpDelivery"
              name="allowPickUpDelivery"
              type="text"
              component={renderAllowPickupDeliveryField}
              //style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginLeft: 10, marginTop: 0 }}>
            <Field
              label=""
              id="allowPayOnDelivery"
              name="allowPayOnDelivery"
              type="text"
              component={renderAllowPayOnDeliveryDeliveryField}
              //style={{ marginTop: 10 }}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="payOnDeliveryMaxWeightInKg"
          name="payOnDeliveryMaxWeightInKg"
          defaultValue={params[0].payOnDeliveryMaxWeightInKg}
          helperText={"Enter Pay On Delivery Maximum Weight(in kg)"}
          type="number"
          component={renderSingleField}
          style={{ marginTop: 10 }}
        />

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
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "shiprateForm",
})(AddShipRateForm);
