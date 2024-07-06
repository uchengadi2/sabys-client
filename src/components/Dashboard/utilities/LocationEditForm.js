import React, { useState, useEffect } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
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
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../../apis/local";
import { EDIT_LOCATION } from "../../../actions/types";

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

const renderNameField = ({
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
      helperText="Enter the name of the city"
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

const renderLocationCodeField = ({
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
      helperText="Enter the code for this City"
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

const renderDescriptionField = ({
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
      helperText="Describe the city"
      label={label}
      id={input.name}
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

const renderTownField = ({
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
      helperText="Town"
      label={label}
      id={input.name}
      // value={formInput.description}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={false}
      minRows={1}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}

      // onChange={handleInput}
    />
  );
};

const renderAddressField = ({
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
      helperText="Address of the location"
      label={label}
      id={input.name}
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

const renderContactPersonField = ({
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
      helperText="Contact Person"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      style={{ marginTop: 20 }}
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
const renderContactPersonEmailAddressField = ({
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
      helperText="Contact Person Email Address"
      variant="outlined"
      label={label}
      id={input.name}
      style={{ marginTop: 20 }}
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

const renderContactPersonPhoneNumberField = ({
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
      helperText="Contact Person Phone Number"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      style={{ marginTop: 20 }}
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

function LocationEditForm(props) {
  const { params, token, userId } = props;

  const classes = useStyles();
  const [state, setState] = useState(params[0].state);
  const [city, setCity] = useState(params[0].city);
  const [countryId, setCountryId] = useState(params[0].countryId);
  const [stateId, setStateId] = useState(params[0].stateId);
  const [cityId, setCityId] = useState(params[0].cityId);
  const [country, setCountry] = useState(params[0].country);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [locationType, setLocationType] = useState(params[0].locationType);
  const [allowAffiliateSale, setAllowAffiliateSale] = useState(
    params[0].allowAffiliateSale
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/states`, {
        params: { country: countryId },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [countryId]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/cities`, {
        params: { state: stateId },
      });
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [stateId]);

  const handleTypeChange = (event) => {
    setLocationType(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };

  const handleStateChange = (event) => {
    setStateId(event.target.value);
    setCityList([]);
  };

  const handleCountryChange = (event) => {
    setCountryId(event.target.value);
    setStateList([]);
  };

  const handleAllowAffiliateSaleChange = (event) => {
    setAllowAffiliateSale(event.target.value);
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
            value={stateId}
            onChange={handleStateChange}
            label="State"
            style={{ marginTop: 20, width: 500, height: 38 }}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>
            Select State/Region/Province where City is located
          </FormHelperText>
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
            value={cityId}
            onChange={handleCityChange}
            label="City"
            style={{ marginTop: 20, width: 500, height: 38 }}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>Select the City of this Location</FormHelperText>
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
            value={countryId}
            onChange={handleCountryChange}
            label="Country"
            style={{ marginTop: 20, width: 500, height: 38 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country where city is located</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderTypeField = ({
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
            labelId="locationType"
            id="locationType"
            value={locationType}
            onChange={handleTypeChange}
            label="Location Type"
            style={{ width: 500, height: 38, marginTop: 20 }}
          >
            <MenuItem value={"own-shop"}>Own Shop</MenuItem>
            <MenuItem value={"own-warehouse"}>Own Warehouse</MenuItem>
            <MenuItem value={"affiliate-shop"}>Affiliate Shop</MenuItem>
            <MenuItem value={"affiliate-warehouse"}>
              Affiliate Warehouse
            </MenuItem>
          </Select>
          <FormHelperText>Select Location Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowAffiliateSaleField = ({
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
            labelId="allowAffiliateSale"
            id="allowAffiliateSale"
            value={allowAffiliateSale}
            onChange={handleAllowAffiliateSaleChange}
            label="Allow Affilate Sale?"
            style={{ width: 500, height: 38, marginTop: 20 }}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Affiliate Sale?</FormHelperText>
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
      name: formValues.name ? formValues.name : params[0].name,
      code: formValues.code ? formValues.code : params[0].code,
      address: formValues.address ? formValues.address : params[0].address,
      town: formValues.town ? formValues.town : params[0].town,
      contactPerson: formValues.contactPerson
        ? formValues.contactPerson
        : params[0].contactPerson,
      contactPersonEmail: formValues.contactPersonEmail
        ? formValues.contactPersonEmail
        : params[0].contactPersonEmail,
      contactPhoneNumber: formValues.contactPhoneNumber
        ? formValues.contactPhoneNumber
        : params[0].contactPhoneNumber,

      description: formValues.description
        ? formValues.description
        : params[0].description,
      country: countryId ? countryId : params[0].countryId,
      state: stateId ? stateId : params[0].stateId,
      city: cityId ? cityId : params[0].cityId,
      locationType: locationType ? locationType : params[0].locationType,
      allowAffiliateSale: allowAffiliateSale
        ? allowAffiliateSale
        : params[0].allowAffiliateSale,
      createdBy: userId,
    };
    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/locations/${params[0].id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_LOCATION,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} Location is updated successfully!!!`
          );
          props.renderLocationEdittedUpdateCounter();
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
    <div className={classes.root}>
      <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 460,
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
          Edit Location
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="locationForm"
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
              defaultValue={params[0].name}
              type="text"
              component={renderNameField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              defaultValue={params[0].code}
              type="text"
              component={renderLocationCodeField}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="country"
          name="country"
          type="text"
          component={renderCountryField}
        />

        <Field
          label=""
          id="state"
          name="state"
          type="text"
          component={renderStateField}
        />

        <Field
          label=""
          id="city"
          name="city"
          type="text"
          component={renderCityField}
        />
        <Field
          label=""
          id="town"
          name="town"
          defaultValue={params[0].town}
          type="text"
          component={renderTownField}
        />

        <Field
          label=""
          id="address"
          name="address"
          defaultValue={params[0].address}
          type="text"
          component={renderAddressField}
        />
        <Field
          label=""
          id="description"
          name="description"
          defaultValue={params[0].description}
          type="text"
          component={renderDescriptionField}
        />
        <Field
          label=""
          id="type"
          name="type"
          type="text"
          component={renderTypeField}
        />
        <Field
          label=""
          id="contactPerson"
          name="contactPerson"
          defaultValue={params[0].contactPerson}
          type="text"
          component={renderContactPersonField}
        />
        <Field
          label=""
          id="contactPhoneNumber"
          name="contactPhoneNumber"
          defaultValue={params[0].contactPhoneNumber}
          type="text"
          component={renderContactPersonPhoneNumberField}
        />
        <Field
          label=""
          id="contactPersonEmail"
          name="contactPersonEmail"
          defaultValue={params[0].contactPersonEmail}
          type="text"
          component={renderContactPersonEmailAddressField}
        />

        <Field
          label=""
          id="allowAffiliateSale"
          name="allowAffiliateSale"
          type="text"
          component={renderAllowAffiliateSaleField}
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
  form: "locationEditForm",
})(LocationEditForm);
