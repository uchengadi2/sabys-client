import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "../../apis/local";
import {
  CREATE_CART,
  EDIT_CART,
  DELETE_CART,
  CREATE_TARGET,
} from "../../actions/types";
import history from "../../history";
import RequestQuote from "../quote/RequestQuote";
import FreezePriceForm from "../freeze/FreezePriceForm";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 90,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitTargetButton: {
    borderRadius: 10,
    height: 40,
    width: 240,
    marginLeft: 50,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitToCartButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 110,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitForSubscriptionButton: {
    borderRadius: 10,
    height: 40,
    width: 120,
    marginLeft: 125,
    marginTop: 30,
    // color: "white",
    // backgroundColor: "#A8A196",
    // "&:hover": {
    //   backgroundColor: theme.palette.common.green,
    // },
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

  submitQuoteButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 15,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
      color: "white",
    },
  },

  submitFreezePricingButton: {
    borderRadius: 10,
    height: 40,
    width: 120,
    marginLeft: 125,
    marginTop: 30,
    marginBottom: 15,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },

  submitBidButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

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
      helperText="How many quantities do you need?"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      //defaultValue={quantity}
      {...custom}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
        },
        //readOnly: true,
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
      helperText="How many quantities do you need?"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      //defaultValue={quantity}
      {...custom}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
          readOnly: true,
        },
        //readOnly: true,
      }}
    />
  );
};

const renderPreferredStartDateField = ({
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
      helperText="Enter your preferred start date"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      //disabled
      // defaultValue={`${minimumQuantity}`}
      onChange={input.onChange}
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

function SendCourseToCheckoutForm(props) {
  const {
    productId,
    token,
    userId,
    salesPreference,
    allowPriceFreezing,
    dealCode,
    dealExpiryDate,
    allowDealQuantityChange,
    showDealPricePerUnit,
    dealStatus,
    dealComment,
    dealDeliveryMode,
    dealCentralizedDeliveryLocation,
    dealCentralizedAgreedDeliveryCost,
    dealDecentralizedDeliveryLocation,
    dealDecentralizedAgreedDeliveryCost,
    showDealDeliveryCost,
    productType,
    dealPaymentPreference,
    showDealPaymentDetails,
    requestDealRedemptionCode,
    dealType,
    isAContributoryDeal,
    dealOwner,
    dealOwnerEntity,
    dealInitialPercentageContribution,
    dealMaximumInstallmentAllowed,
    includeGatewayChargesInPrice,
    gatewayFixedCharge,
    gatewayRateCharge,
    isACreditDeal,
  } = props;
  const [quantity, setQuantity] = useState(props.minQuantity);
  const [newQuantity, setNewQuantity] = useState(props.minQuantity);
  const [price, setPrice] = useState();
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [minimumQuantity, setMinimumQuantity] = useState(props.minQuantity);
  const [cartId, setCartId] = useState();
  const [cartList, setCartList] = useState([]);
  const [cartForCheckoutList, setCartForCheckoutList] = useState([]);
  const [allUserCartList, setAllUserCartList] = useState([]);
  const [total, setTotal] = useState();
  const [sameProductAlreadyInCart, setSameProductAlreadyInCart] =
    useState(false);
  const [dealNumberOfInstallments, setDealNumberOfInstallments] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(newQuantity);
    setPrice(props.price);
  }, [props, newQuantity]);

  useEffect(() => {
    if (!quantity) {
      return;
    }
    if (!price) {
      return;
    }

    const sum = (+quantity * +price)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    setTotal(sum);
  }, [quantity, price]);

  const classes = useStyles();
  // const [total, setTotal] = useState(
  //   price
  //     ? (
  //     : 0
  // );
  const [loading, setLoading] = useState();
  const [isLoading, setIsLoading] = useState();

  const [isFreezeLoading, setIsFreezeLoading] = useState();

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          //productLocation: location,
          product: productId,
        },
      });

      const item = response.data.data.data;

      allData.push({
        id: item[0]._id,
        quantity: item[0].quantity,
        cartHolder: item[0].cartHolder,
        salesPreference: item[0].salesPreference,
      });

      if (allData[0].quantity) {
        setProductQuantityInCart(allData[0].quantity);
      }

      if (allData[0].cartHolder) {
        setCartHolder(allData[0].cartHolder);
      }

      if (salesPreference !== "deal") {
        setSameProductAlreadyInCart(true);
      }

      if (allData[0].id) {
        setCartId(allData[0].id);
      }

      setAllUserCartList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          status: "marked-for-checkout",
        },
      });

      const item = response.data.data.data;
      item.map((product) => {
        allData.push({
          id: product._id,
          quantity: product.quantity,
          cartHolder: product.cartHolder,
          salesPreference: product.salesPreference,
        });
      });

      setCartForCheckoutList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          status: "unmarked-for-checkout",
        },
      });

      const item = response.data.data.data;
      item.map((product) => {
        allData.push({
          id: product._id,
          quantity: product.quantity,
          cartHolder: product.cartHolder,
          salesPreference: product.salesPreference,
        });
      });

      setCartList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [userId]);

  const onQuantityChange = (e) => {
    const newQuantity = parseFloat(e.target.value);

    const newTotal = newQuantity * parseFloat(price);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    setNewQuantity(newQuantity);
  };

  const onDealNumberOfInstallmentChange = (event) => {
    setDealNumberOfInstallments(event.target.value);

    // if (event.target.value > 0) {
    //   if (event.target.value > minimumContributableAmount) {
    //     setCanMakeContribution(true);
    //   } else {
    //     setCanMakeContribution(false);
    //   }
    // } else {
    //   setCanMakeContribution(false);
    // }
  };

  const renderPreferredNumberOfInstallmentField = () => {
    return (
      <TextField
        label="Enter Your Preferred Number of Installments"
        variant="outlined"
        fullWidth
        type="number"
        id="dealNumberOfInstallments"
        name="dealNumberOfInstallments"
        // defaultValue={dealNumberOfInstallments}
        style={{
          marginTop: 20,
          marginLeft: -13,
          marginBottom: 20,
          width: 300,
          height: 30,
        }}
        onChange={onDealNumberOfInstallmentChange}
      />
    );
  };
  console.log("dealNumberOfInstallments:", dealNumberOfInstallments);
  console.log("isACreditDeal is:", isACreditDeal);

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
        helperText="Amount"
        label={label}
        id={input.name}
        name={input.name}
        value={total}
        fullWidth
        type={type}
        style={{ marginTop: 3, width: 240 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 38,
              fontSize: "2em",
            },
            readOnly: true,
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
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Minimum Quantity Required(MQR)"
        variant="outlined"
        label={label}
        id={input.name}
        //value={input.value}
        fullWidth
        //required
        type={type}
        {...custom}
        disabled
        defaultValue={`${minimumQuantity} ${
          minimumQuantity <= 1 ? "unit" : "units"
        }`}
        onChange={input.onChange}
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

  const buttonContent = () => {
    return <React.Fragment> Buy Now</React.Fragment>;
  };

  const cartButtonContent = () => {
    return <React.Fragment>Add to Cart</React.Fragment>;
  };

  const targetButtonContent = () => {
    return <React.Fragment>Add to My Target Scheme</React.Fragment>;
  };

  const creditButtonContent = () => {
    return <React.Fragment>Add to My Credit Scheme</React.Fragment>;
  };

  const subscriptionButtonContent = () => {
    return <React.Fragment>Subscribe</React.Fragment>;
  };

  const requestQuoteButtonContent = () => {
    return <React.Fragment>Request a Quote</React.Fragment>;
  };

  const biddingButtonContent = () => {
    return <React.Fragment>Submit a Bid</React.Fragment>;
  };

  const freezePriceButtonContent = () => {
    return <React.Fragment>Freeze Price</React.Fragment>;
  };

  //computing the weight per kg
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

  //this is the function that adds to checkout

  const onSubmit = (formValues) => {
    setLoading(true);

    //console.log("preferredStartDate is:", formValues.preferredStartDate);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);

      return;
    }

    if (!newQuantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty or 0");
      setLoading(false);

      return;
    }

    if (newQuantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);

      return;
    }

    if (newQuantity < +minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);

      return;
    }

    const data = {
      product: productId,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "PRO-" + Math.floor(Math.random() * 1000000000) + "-CT",

      quantity: quantity,
      cartHolder: props.userId,
      isDeleted: false,
      price: price,
      currency: props.currency,
      status: "marked-for-checkout",
      weightInKg: weightInKg,
      unit: props.unit,
      weightPerUnit: props.weightPerUnit,
      isVatable: props.isVatable,
      revenueMargin: props.revenueMargin,
      revenueMarginShouldPrevail: props.revenueMarginShouldPrevail,
      dealCode,
      dealExpiryDate,
      allowDealQuantityChange,
      showDealPricePerUnit,
      dealStatus,
      dealComment,
      dealDeliveryMode,
      dealCentralizedDeliveryLocation,
      dealCentralizedAgreedDeliveryCost,
      dealDecentralizedDeliveryLocation,
      dealDecentralizedAgreedDeliveryCost,
      showDealDeliveryCost,
      productType,
      salesPreference,
      dealType,
      showDealPaymentDetails,
      dealPaymentPreference,
      requestDealRedemptionCode,
      isAContributoryDeal,
      dealInitialPercentageContribution,
      dealMaximumInstallmentAllowed,
      includeGatewayChargesInPrice,
      gatewayFixedCharge,
      gatewayRateCharge,
    };

    if (salesPreference === "deal") {
      //delete all items in this user's cart
      cartForCheckoutList.map((cart, index) => {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          await api.delete(`/carts/${cart.id}`);
          dispatch({
            type: DELETE_CART,
            //payload: response2.data.data.data,
          });
          //props.cartCounterHandler(-1);
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      });
    }

    // if (salesPreference !== "deal") {
    if (sameProductAlreadyInCart === false) {
      cartForCheckoutList.map((cart, index) => {
        if (cart.salesPreference === "deal") {
          const createCartForm = async () => {
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${props.token}`;
            await api.delete(`/carts/${cart.id}`);
            dispatch({
              type: DELETE_CART,
              //payload: response2.data.data.data,
            });
            //props.cartCounterHandler(-1);
          };
          createCartForm().catch((err) => {
            //props.handleFailedSnackbar();
            console.log("err:", err.message);
          });
        }
      });
      //create a new cart and add the product
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.post(`/carts`, data);

          if (response.data.status === "success") {
            dispatch({
              type: CREATE_CART,
              payload: response.data.data.data,
            });

            // props.handleSuccessfulCreateSnackbar(
            //   `item(s) successfully added to cart. Please visit the cart to continue to checkout and payment`
            // );
            //props.cartCounterHandler(-1);
            history.push(`/checkouts/checkouts`);
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
    } else {
      let totalProductQuantity = 0;

      if (salesPreference !== "deal") {
        //update existing cart

        if (!productQuantityInCart) {
          totalProductQuantity = quantity;
        } else {
          totalProductQuantity =
            parseFloat(productQuantityInCart) + parseFloat(quantity);
        }
      }

      const data = {
        quantity: totalProductQuantity,
        price: price,
        currency: props.currency,
        isDeleted: false,
        weightInKg: weightInKg,
        unit: props.unit,
        weightPerUnit: props.weightPerUnit,
        isVatable: props.isVatable,
        revenueMargin: props.revenueMargin,
        revenueMarginShouldPrevail: props.revenueMarginShouldPrevail,
        dealCode,
        dealExpiryDate,
        allowDealQuantityChange,
        showDealPricePerUnit,
        dealStatus,
        dealComment,
        dealDeliveryMode,
        dealCentralizedDeliveryLocation,
        dealCentralizedAgreedDeliveryCost,
        dealDecentralizedDeliveryLocation,
        dealDecentralizedAgreedDeliveryCost,
        showDealDeliveryCost,
        productType,
        salesPreference,
        dealType,
        showDealPaymentDetails,
        dealPaymentPreference,
        requestDealRedemptionCode,
        isAContributoryDeal,
        dealInitialPercentageContribution,
        dealMaximumInstallmentAllowed,
        includeGatewayChargesInPrice,
        gatewayFixedCharge,
        gatewayRateCharge,
      };

      //update the exist

      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.patch(`/carts/${cartId}`, data);

          if (response.data.status === "success") {
            dispatch({
              type: EDIT_CART,
              payload: response.data.data.data,
            });

            // props.handleSuccessfulCreateSnackbar(
            //   `item(s) successfully added to cart!!!`
            // );
            history.push(`/checkouts/checkouts`);
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
      // } //end of the no cartholder
    }
    // } else {
    //   //add come code here
    // }
  };

  //calculate the Weight per kg of this product

  //this is the script to add to cart

  const onSubmitToCart = (formValues) => {
    setIsLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setIsLoading(false);
      return;
    }

    if (!newQuantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty or 0");
      setIsLoading(false);
      return;
    }

    if (newQuantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setIsLoading(false);
      return;
    }

    if (newQuantity < +minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setIsLoading(false);
      return;
    }

    const data = {
      product: productId,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "PRO-" + Math.floor(Math.random() * 1000000000) + "-CT",

      quantity: quantity,
      cartHolder: props.userId,
      isDeleted: false,
      price: price,
      currency: props.currency,
      status: "unmarked-for-checkout",
      weightInKg: weightInKg,
      unit: props.unit,
      weightPerUnit: props.weightPerUnit,
      isVatable: props.isVatable,
      revenueMargin: props.revenueMargin,
      revenueMarginShouldPrevail: props.revenueMarginShouldPrevail,
      dealCode,
      dealExpiryDate,
      allowDealQuantityChange,
      showDealPricePerUnit,
      dealStatus,
      dealComment,
      dealDeliveryMode,
      dealCentralizedDeliveryLocation,
      dealCentralizedAgreedDeliveryCost,
      dealDecentralizedDeliveryLocation,
      dealDecentralizedAgreedDeliveryCost,
      showDealDeliveryCost,
      productType,
      salesPreference,
      dealType,
      showDealPaymentDetails,
      dealPaymentPreference,
      requestDealRedemptionCode,
      isAContributoryDeal,
      dealInitialPercentageContribution,
      dealMaximumInstallmentAllowed,
      includeGatewayChargesInPrice,
      gatewayFixedCharge,
      gatewayRateCharge,
    };

    if (salesPreference === "deal") {
      //delete all items in this user's cart
      cartList.map((cart, index) => {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          await api.delete(`/carts/${cart.id}`);
          dispatch({
            type: DELETE_CART,
            //payload: response2.data.data.data,
          });
          props.cartCounterHandler(-1);
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      });
    }

    // if (salesPreference !== "deal") {
    if (sameProductAlreadyInCart === false) {
      //delete all deals in cart

      cartList.map((cart, index) => {
        if (cart.salesPreference === "deal") {
          const createCartForm = async () => {
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${props.token}`;
            await api.delete(`/carts/${cart.id}`);
            dispatch({
              type: DELETE_CART,
              //payload: response2.data.data.data,
            });
            props.cartCounterHandler(-1);
          };
          createCartForm().catch((err) => {
            //props.handleFailedSnackbar();
            console.log("err:", err.message);
          });
        }
      });

      //create a new cart and add the product
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.post(`/carts`, data);

          if (response.data.status === "success") {
            dispatch({
              type: CREATE_CART,
              payload: response.data.data.data,
            });

            props.handleSuccessfulCreateSnackbar(
              `item(s) successfully added to cart. Please visit the cart to continue to checkout and payment`
            );
            props.cartCounterHandler(1);
            history.push("/");
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
    } else {
      let totalProductQuantity = 0;
      let newWeightInKg = 0;
      if (salesPreference !== "deal") {
        //update existing cart

        if (!productQuantityInCart) {
          totalProductQuantity = quantity;
          newWeightInKg = weightInKg;
        } else {
          totalProductQuantity =
            parseFloat(productQuantityInCart) + parseFloat(quantity);
          if (props.unit === "kg") {
            newWeightInKg = props.weightPerUnit * totalProductQuantity;
          } else if (props.unit === "g") {
            newWeightInKg = (props.weightPerUnit / 1000) * totalProductQuantity;
          } else if (props.unit === "ibs") {
            newWeightInKg =
              props.weightPerUnit * 0.45359237 * totalProductQuantity;
          } else if (props.unit === "tonnes") {
            newWeightInKg = props.weightPerUnit * 1000 * totalProductQuantity;
          }
        }
      }

      const data = {
        quantity: totalProductQuantity,
        price: price,
        currency: props.currency,
        isDeleted: false,
        weightInKg: newWeightInKg,
        unit: props.unit,
        weightPerUnit: props.weightPerUnit,
        isVatable: props.isVatable,
        revenueMargin: props.revenueMargin,
        revenueMarginShouldPrevail: props.revenueMarginShouldPrevail,
        dealExpiryDate,
        allowDealQuantityChange,
        showDealPricePerUnit,
        dealCode,
        dealStatus,
        dealComment,
        dealDeliveryMode,
        dealCentralizedDeliveryLocation,
        dealCentralizedAgreedDeliveryCost,
        dealDecentralizedDeliveryLocation,
        dealDecentralizedAgreedDeliveryCost,
        showDealDeliveryCost,
        productType,
        salesPreference,
        dealType,
        showDealPaymentDetails,
        dealPaymentPreference,
        requestDealRedemptionCode,
        isAContributoryDeal,
        dealInitialPercentageContribution,
        dealMaximumInstallmentAllowed,
        includeGatewayChargesInPrice,
        gatewayFixedCharge,
        gatewayRateCharge,
      };

      //update the exist

      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.patch(`/carts/${cartId}`, data);

          if (response.data.status === "success") {
            dispatch({
              type: EDIT_CART,
              payload: response.data.data.data,
            });

            props.handleSuccessfulCreateSnackbar(
              `item(s) successfully added to cart!!!`
            );
            history.push("/");
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
    } //end of the no cartholder
    // } else {
    //   //add come code here
    // }
  };

  //submitting to the  target scheme

  const onSubmitToTarget = (formValues) => {
    setIsLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setIsLoading(false);
      return;
    }

    if (!newQuantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty or 0");
      setIsLoading(false);
      return;
    }

    if (newQuantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setIsLoading(false);
      return;
    }

    if (newQuantity < +minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setIsLoading(false);
      return;
    }

    if (dealNumberOfInstallments < 1) {
      props.handleFailedSnackbar(
        `Your Preferred Number of Installments cannot be less than 1. Make the correction and try again`
      );
      setIsLoading(false);
      return;
    }

    if (dealMaximumInstallmentAllowed < +dealNumberOfInstallments) {
      props.handleFailedSnackbar(
        `Your Preferred Number of Installments cannot be greater than ${dealMaximumInstallmentAllowed}. Make the correction and try again`
      );
      setIsLoading(false);
      return;
    }

    const data = {
      product: productId,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "PRO-" + Math.floor(Math.random() * 1000000000) + "-CT",

      quantity: quantity,
      cartHolder: props.userId,
      isDeleted: false,
      price: price,
      currency: props.currency,
      status: "pending",
      weightInKg: weightInKg,
      unit: props.unit,
      weightPerUnit: props.weightPerUnit,
      isVatable: props.isVatable,
      revenueMargin: props.revenueMargin,
      revenueMarginShouldPrevail: props.revenueMarginShouldPrevail,
      dealCode,
      dealExpiryDate,
      allowDealQuantityChange,
      showDealPricePerUnit,
      dealStatus,
      dealComment,
      dealDeliveryMode,
      dealCentralizedDeliveryLocation,
      dealCentralizedAgreedDeliveryCost,
      dealDecentralizedDeliveryLocation,
      dealDecentralizedAgreedDeliveryCost,
      showDealDeliveryCost,
      productType,
      salesPreference,
      dealType,
      showDealPaymentDetails,
      dealPaymentPreference,
      requestDealRedemptionCode,
      isAContributoryDeal,
      isACreditDeal,
      dealOwnerEntity,
      dealOwner,
      dealInitialPercentageContribution,
      dealNumberOfInstallments,
      includeGatewayChargesInPrice,
      gatewayFixedCharge,
      gatewayRateCharge,
    };

    //create a new cart and add the product
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/targets`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TARGET,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `item(s) successfully added to your target scheme. Please visit the target scheme page to continue`
          );
          //props.cartCounterHandler(1);
          history.push("/dealscentral");
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

    // } else {
    //   //add come code here
    // }
  };

  const onSubmitForSubscription = (formValues) => {};

  const onSubmitForQuoteRequest = (formValues) => {};

  const onSubmitABidRequest = (formValues) => {};

  return (
    <form id="sendCourseToCheckoutForm">
      <Box
        sx={{
          width: 200,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
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
          type="text"
          component={renderMinimumQuantityField}
          style={{ width: 300 }}
        />
        <Field
          label=""
          id="quantity"
          name="quantity"
          type="number"
          defaultValue={quantity}
          onChange={onQuantityChange}
          // component={renderRequestedQuantityField}
          component={
            salesPreference === "deal" && allowDealQuantityChange
              ? renderRequestedQuantityField
              : salesPreference !== "deal"
              ? renderRequestedQuantityField
              : renderDealSameQuantityField
          }
          style={{ width: 300, marginTop: 10 }}
        />

        <Grid container direction="row">
          {props.pricingMechanism === "pricing" && (
            <Grid item style={{ width: 50, marginTop: 45, fontSize: 45 }}>
              <span style={{ color: "grey" }}>&#8358;</span>
            </Grid>
          )}
          {props.pricingMechanism === "pricing" && (
            <Grid item style={{ marginLeft: 10, width: 100 }}>
              <Field
                label=""
                id="total"
                name="total"
                defaultValue={total}
                type="text"
                component={renderTotalField}
                style={{ width: 100 }}
              />
            </Grid>
          )}
          {/* <Grid
            item
            style={{ marginTop: 10, marginBottom: 10 }}
            justifyContent="center"
          >
            <Field
              label=""
              id="preferredStartDate"
              name="preferredStartDate"
              type="date"
              component={renderPreferredStartDateField}
              style={{ width: 300, marginBottom: 20 }}
            />
          </Grid> */}
          <Container>{renderPreferredNumberOfInstallmentField()}</Container>
        </Grid>

        {props.pricingMechanism === "pricing" &&
          isAContributoryDeal === false && (
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
          )}

        {props.pricingMechanism === "pricing" &&
          isAContributoryDeal === false && (
            <Button
              variant="text"
              className={classes.submitToCartButton}
              onClick={props.handleSubmit(onSubmitToCart)}
            >
              {isLoading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                cartButtonContent()
              )}
            </Button>
          )}

        {props.pricingMechanism === "pricing" &&
          salesPreference === "deal" &&
          isAContributoryDeal === true &&
          isACreditDeal === false && (
            <Button
              variant="contained"
              className={classes.submitTargetButton}
              onClick={props.handleSubmit(onSubmitToTarget)}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                targetButtonContent()
              )}
            </Button>
          )}

        {props.pricingMechanism === "pricing" &&
          salesPreference === "deal" &&
          isAContributoryDeal === true &&
          isACreditDeal === true && (
            <Button
              variant="contained"
              className={classes.submitTargetButton}
              onClick={props.handleSubmit(onSubmitToTarget)}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                creditButtonContent()
              )}
            </Button>
          )}

        {props.pricingMechanism === "pricing" && allowPriceFreezing && (
          <Button
            component={Link}
            // to="/mobileapps"
            //to={`/categories/${categoryId}/${productId}`}
            to={`/freezeprice/${props.categorySlug}/${props.slug}`}
            //varaint="outlined"
            className={classes.submitFreezePricingButton}
            onClick={() => <FreezePriceForm />}
          >
            {isFreezeLoading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              freezePriceButtonContent()
            )}
          </Button>
        )}

        {props.pricingMechanism === "pricing" && props.allowSubscription && (
          <Button
            variant="outlined"
            className={classes.submitForSubscriptionButton}
            onClick={props.handleSubmit(onSubmitForSubscription)}
          >
            {isLoading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              subscriptionButtonContent()
            )}
          </Button>
        )}

        {props.pricingMechanism === "request-quote" && (
          <Button
            component={Link}
            // to="/mobileapps"
            //to={`/categories/${categoryId}/${productId}`}
            to={`/requestquote/${props.categorySlug}/${props.slug}`}
            varaint="outlined"
            className={classes.submitQuoteButton}
            onClick={() => <RequestQuote />}
          >
            {isLoading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              requestQuoteButtonContent()
            )}
          </Button>
        )}
        {props.pricingMechanism === "bidding" && (
          <Button
            variant="text"
            className={classes.submitBidButton}
            onClick={props.handleSubmit(onSubmitABidRequest)}
          >
            {isLoading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              biddingButtonContent()
            )}
          </Button>
        )}
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "sendCourseToCheckoutForm",
})(SendCourseToCheckoutForm);
