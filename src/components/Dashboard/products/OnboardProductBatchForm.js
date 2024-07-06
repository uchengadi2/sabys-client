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
import { CREATE_INVENTORY } from "../../../actions/types";

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

const MAX_COUNT = 12;

function OnboardProductBatchForm(props) {
  const { params, token, userId } = props;
  const classes = useStyles();

  const [productId, setProductId] = useState(params[0].id);

  const [weightPerUnit, setWeightPerUnit] = useState(params[0].weightPerUnit);
  const [sku, setSku] = useState(params[0].sku);
  const [configuration, setConfiguration] = useState(params[0].configuration);
  const [productName, setProductName] = useState(params[0].name);
  const [category, setCategory] = useState(params[0].category);
  const [unit, setUnit] = useState(params[0].unit);
  const [pricePerUnit, setPricePerUnit] = useState(params[0].pricePerUnit);
  const [priceLabel, setPriceLabelUnit] = useState(params[0].priceLabel);
  const [barcode, setBarcode] = useState(params[0].barcode);
  const [slug, setSlug] = useState(params[0].slug);
  const [customerEmail, setCustomerEmail] = useState();
  const [deliveryPreference, setDeliveryPreference] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [cityName, setCityName] = useState();

  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const [timeToLiveInHours, setTimeToLiveInHours] = useState();
  const [addToWhatsappGroup, setAddToWhatsappGroup] = useState();
  const [addToEmailList, setAddToEmailList] = useState();
  const [dateRequested, setDateRequested] = useState();
  const [comment, setComment] = useState();
  const [locationList, setLocationList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [supplier, setSupplier] = useState();
  const [location, setLocation] = useState();
  const [batchNumber, setBatchNumber] = useState(
    "INV-" + Math.floor(Math.random() * 10000000000000) + "-" + "PRO"
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      const response = await api.get(`/suppliers`);
      const workingData = response.data.data.data;
      workingData.map((supplier) => {
        allData.push({ id: supplier._id, name: supplier.name });
      });
      setSupplierList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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

  //get the supplier list
  const renderSupplierList = () => {
    return supplierList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const handleQuoteStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
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

  const renderSupplierField = ({
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
            labelId="supplier"
            id="supplier"
            value={supplier}
            onChange={handleSupplierChange}
            //label="Allow Price Freezing"

            style={{ width: 500, marginTop: 20, height: 38 }}
            //{...input}
          >
            {renderSupplierList()}
          </Select>
          <FormHelperText>Select Supplier</FormHelperText>
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
    return <React.Fragment>Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!location) {
      props.handleFailedSnackbar(
        "Please select the location you are onboarding to "
      );
      setLoading(false);
      return;
    }

    if (!formValues["quantity"]) {
      props.handleFailedSnackbar(
        "Please enter the quantity of the product you are onboarding "
      );
      setLoading(false);
      return;
    }

    if (!formValues["costPerUnit"]) {
      props.handleFailedSnackbar(
        "Please enter the cost per unit of the product "
      );
      setLoading(false);
      return;
    }

    const data = {
      batchStatus: "in-stock",
      product: productId,
      location: location,
      batchNumber: formValues.batchNumber
        ? formValues.batchNumber
        : batchNumber,
      quantity: formValues.quantity,
      remainingQuantity: formValues.quantity,
      unit: unit,
      barcode: barcode,
      sku: sku,
      costPerUnit: formValues.costPerUnit,
      weightPerUnit: weightPerUnit,
      onBoardedBy: props.userId,
      comment: formValues.comment,
      source: null,
      supplier: supplier,
      slug: slug,
      configuration: configuration,
      currentProductPricePerUnit: pricePerUnit ? pricePerUnit : null,
      thisPriceLabel: priceLabel,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/inventories`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_INVENTORY,
            payload: response.data.data.data,
          });

          props.handleSuccessfulOnBoardItemSnackbar(
            `A New Product Batch, Number: ${response.data.data.data.batchNumber} is onboarded successfully!!!`
          );
          props.renderProductOnBoardUpdateCounter();
          props.handleOnBoardDialogOpenStatus();
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
      <form id="onboardProductBatchForm" className={classes.formStyles}>
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
            onClick={() => [props.handleOnBoardDialogOpenStatus()]}
          />
        </Grid>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">
              Onboarding Product To Inventory
            </Typography>
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
                id="weightPerUnit"
                name="weightPerUnit"
                helperText={"Weight Per Unit"}
                defaultValue={weightPerUnit}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "49%", marginLeft: 15 }}>
              <Field
                label=""
                id="unit"
                name="unit"
                helperText="Unit"
                defaultValue={unit}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="barcode"
            name="barcode"
            type="text"
            helperText={"Barcode"}
            defaultValue={barcode}
            component={renderSingleLineField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "48%" }}>
              <Field
                label=""
                id="category"
                name="category"
                helperText={"Category"}
                defaultValue={category}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "49%", marginLeft: 15 }}>
              <Field
                label=""
                id="slug"
                name="slug"
                helperText="Slug"
                defaultValue={slug}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "38%" }}>
              <Field
                label=""
                id="pricePerUnit"
                name="pricePerUnit"
                helperText={"Current Product Price Per Unit"}
                defaultValue={pricePerUnit}
                type="text"
                component={renderEditableSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "59%", marginLeft: 15 }}>
              <Field
                label=""
                id="priceLabel"
                name="priceLabel"
                helperText="Current Price Label"
                defaultValue={priceLabel}
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Batch Details
            </FormLabel>
          </Grid>
          <Field
            label=""
            id="location"
            name="location"
            type="text"
            component={renderLocationField}
            helperText="Location"
            //defaultValue={quoteRequestNumber}
            autoComplete="off"
            style={{ marginTop: 20, width: "100%" }}
          />
          <Field
            label=""
            id="batchNumber"
            name="batchNumber"
            type="text"
            component={renderEditableSingleLineField}
            //defaultValue={deliveryPreference}
            helperText="Enter the Batch Number(Could be Auto-generated)"
            autoComplete="off"
            style={{ marginTop: 20, width: "100%" }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: "48%" }}>
              <Field
                label=""
                id="quantity"
                name="quantity"
                helperText="Quantity"
                //defaultValue={addToWhatsappGroup}
                type="number"
                component={renderEditableSingleLineField}
              />
            </Grid>
            <Grid item style={{ width: "49%", marginLeft: 15 }}>
              <Field
                label=""
                id="costPerUnit"
                name="costPerUnit"
                helperText={"Cost Per Unit"}
                // defaultValue={addToEmailList}
                type="number"
                component={renderEditableSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="supplier"
            name="supplier"
            helperText="Supplier"
            type="text"
            component={renderSupplierField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Field
            label=""
            id="comment"
            name="comment"
            helperText="Comment"
            type="text"
            component={renderEditableMultilineField}
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
  form: "onboardProductBatchForm",
})(OnboardProductBatchForm);
