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
import { EDIT_SUPPLIER } from "../../../actions/types";

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

function SupplierEditForm(props) {
  const { params, token, userId } = props;
  console.log("params:", params);
  const classes = useStyles();
  const [state, setState] = useState(params[0].country);
  const [country, setCountry] = useState(params[0].country);
  const [countryId, setCountryId] = useState(params[0].countryId);
  const [stateId, setStateId] = useState(params[0].stateId);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supplierType, setSupplierType] = useState(
    params[0].supplierType.toLowerCase()
  );

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

  const handleStateChange = (event) => {
    setStateId(event.target.value);
  };

  const handleSupplierTypeChange = (event) => {
    setSupplierType(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryId(event.target.value);
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
            value={stateId}
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
            value={countryId}
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
      name: formValues.name ? formValues.name : params[0].name,
      supplierNumber: formValues.supplierNumber
        ? formValues.supplierNumber
        : params[0].supplierNumber,

      description: formValues.description
        ? formValues.description
        : params[0].description,
      country: countryId ? countryId : params[0].countryId,
      state: stateId ? stateId : params[0].stateId,
      supplierType: supplierType ? supplierType : params[0].supplierType,
      address: formValues.address ? formValues.address : params[0].address,
      contactPerson: formValues.contactPerson
        ? formValues.contactPerson
        : params[0].contactPerson,
      contactPhoneNumbers: formValues.contactPhoneNumbers
        ? formValues.contactPhoneNumbers
        : params[0].contactPhoneNumbers,
      contactPersonEmail: formValues.contactPersonEmail
        ? formValues.contactPersonEmail
        : params[0].contactPersonEmail,
      products: formValues.products ? formValues.products : params[0].products,
      bankDetails: formValues.bankDetails
        ? formValues.bankDetails
        : params[0].bankDetails,
      createdBy: props.userId,
    };
    if (data) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/suppliers/${params[0].id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_SUPPLIER,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} Supplier is added successfully!!!`
          );
          props.renderSupplierEdittedUpdateCounter();
          props.handleEditDialogOpenStatus();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      editForm().catch((err) => {
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
          Update Supplier Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="supplierEditForm"
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
              id="supplierNumber"
              name="supplierNumber"
              defaultValue={params[0].supplierNumber}
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
          id="supplierType"
          name="supplierType"
          type="text"
          component={renderSupplierTypeField}
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
          id="contactPhoneNumbers"
          name="contactPhoneNumbers"
          defaultValue={params[0].contactPhoneNumbers}
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
          id="products"
          name="products"
          defaultValue={params[0].products}
          type="text"
          component={renderSupplierProductsField}
        />
        <Field
          label=""
          id="bankDetails"
          name="bankDetails"
          defaultValue={params[0].bankDetails}
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
  form: "supplierEditForm",
})(SupplierEditForm);
