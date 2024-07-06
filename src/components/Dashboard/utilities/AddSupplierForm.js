import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
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
import { CREATE_SUPPLIER } from "../../../actions/types";

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
      helperText="Supplier Name"
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

const renderSupplierNumberField = ({
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
      helperText="Supplier Number"
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
      helperText="Describe the Supplier"
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
      helperText="Supplier Address"
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

const renderSupplierProductsField = ({
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
      helperText="Supplier Products"
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

const renderSupplierBankDetailsField = ({
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
      helperText="Supplier Bank Details"
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

function AddSupplierForm(props) {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supplierType, setSupplierType] = useState("local");

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

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleSupplierTypeChange = (event) => {
    setSupplierType(event.target.value);
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

  const renderSupplierTypeField = ({
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
            labelId="type"
            id="type"
            value={supplierType}
            onChange={handleSupplierTypeChange}
            label="Supplier Type"
            style={{ width: 500, height: 38, marginTop: 20 }}
          >
            <MenuItem value={"local"}>Local</MenuItem>
            <MenuItem value={"foreign"}>Foreign</MenuItem>
          </Select>
          <FormHelperText>Select Supplier Type</FormHelperText>
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
            style={{ marginTop: 20, width: 500, height: 38 }}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>Select Supplier State</FormHelperText>
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
            label="Country"
            style={{ marginTop: 20, width: 500, height: 38 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Supplier Country</FormHelperText>
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
      name: formValues.name,
      supplierNumber: formValues.supplierNumber
        ? formValues.supplierNumber
        : "CT-" + Math.floor(Math.random() * 100000),
      description: formValues.description,
      country: country,
      state: state,
      supplierType: supplierType,
      address: formValues.address,
      contactPerson: formValues.contactPerson,
      contactPhoneNumbers: formValues.contactPhoneNumbers,
      contactPersonEmail: formValues.contactPersonEmail,
      products: formValues.products,
      bankDetails: formValues.bankDetails,
      createdBy: props.userId,
    };
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/suppliers`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_SUPPLIER,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.name} Supplier is added successfully!!!`
          );
          props.renderSupplierUpdateCounter();
          props.handleDialogOpenStatus();
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
            marginLeft: 460,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Add Supplier
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="supplierForm"
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
              type="text"
              component={renderNameField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="supplierNumber"
              name="supplierNumber"
              type="text"
              component={renderSupplierNumberField}
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
          id="address"
          name="address"
          type="text"
          component={renderAddressField}
        />
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderDescriptionField}
        />
        <Field
          label=""
          id="supplierType"
          name="supplierType"
          type="text"
          component={renderSupplierTypeField}
        />
        <Field
          label=""
          id="contactPerson"
          name="contactPerson"
          type="text"
          component={renderContactPersonField}
        />
        <Field
          label=""
          id="contactPhoneNumbers"
          name="contactPhoneNumbers"
          type="text"
          component={renderContactPersonPhoneNumberField}
        />
        <Field
          label=""
          id="contactPersonEmail"
          name="contactPersonEmail"
          type="text"
          component={renderContactPersonEmailAddressField}
        />
        <Field
          label=""
          id="products"
          name="products"
          type="text"
          component={renderSupplierProductsField}
        />
        <Field
          label=""
          id="bankDetails"
          name="bankDetails"
          type="text"
          component={renderSupplierBankDetailsField}
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
  form: "supplierForm",
})(AddSupplierForm);
