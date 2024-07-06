import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./../../apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TARGET,
  EDIT_TARGET,
  FETCH_TARGETS,
  CREATE_CONTRIBUTION,
} from "./../../actions/types";
import history from "./../../history";
import ThankYou from "./../../components/thankyou/ThankYou";

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
    width: 200,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
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
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function Paystack(props) {
  const dispatch = useDispatch();

  //console.log("this props is at paystack:", props);

  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const config = {
    reference: props.orderNumber,
    className: classes.checkout,
    email: props.email,
    amount: props.amount,
    publicKey: "pk_test_9181f2dcbb5a6bf2cf56c8f2632eaa5e2fd182cb", //wholeroof test
    //publicKey: "pk_live_5700e72ac96f8aafda7af34e76b1dcfd1b6ec8b2", //wholeroof live
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status == "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  //console.log("the product list is at paystack:", props.productList);

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed paystck");
  };

  const componentProps = {
    ...config,
    text: props.text,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const commitDataToDatabase = () => {
    const targetData = {
      amountAlreadyContributed:
        props.amountAlreadyContributed + props.contributedAmount,
      currentInstallmentRound: props.currentInstallmentRound + 1,
      dealStatus:
        props.dealNumberOfInstallments === props.currentInstallmentRound + 1
          ? "inactive"
          : props.dealStatus,
    };

    if (targetData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(
          `/targets/${props.targetId}`,
          targetData
        );

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_TARGET,
            payload: response.data.data.data,
          });
          const contributionData = {
            refNumber: props.orderNumber,
            product: props.product,
            target: props.targetId,
            contributedAmount: props.contributedAmount,
            targetHolder: props.targetHolder,
            dealCode: props.dealCode,
            dealExpiryDate: props.dealExpiryDate,
            dealType: props.dealType,
            dealStatus: props.dealStatus,
            dealDeliveryMode: props.dealDeliveryMode,
            productType: props.productType,
            salesPreference: props.salesPreference,
            dealPaymentPreference: props.dealPaymentPreference,
            dealOwner: props.dealOwner,
            dealOwnerEntity: props.dealOwnerEntity,
            paymentStatus: props.paymentStatus,
            modeOfPayment: props.modeOfPayment,
            postedBy: props.userId,
            installementRound: props.currentInstallmentRound,
            includeGatewayChargesInPrice: props.includeGatewayChargesInPrice,
            gatewayFixedCharge: props.gatewayFixedCharge,
            gatewayRateCharge: props.gatewayRateCharge,
          };

          if (contributionData) {
            const createConForm = async () => {
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${props.token}`;
              const response2 = await api.post(
                `/contributions`,
                contributionData
              );

              if (response2.data.status === "success") {
                dispatch({
                  type: CREATE_CONTRIBUTION,
                  payload: response2.data.data.data,
                });

                // setLoading(false);

                props.renderPageUpdate();
              } else {
                props.handleFailedSnackbar(
                  "Something went wrong, please try again!!!"
                );
              }
            };
            createConForm().catch((err) => {
              //props.handleFailedSnackbar();
              console.log("err:", err.message);
            });
          } else {
            //props.handleFailedSnackbar("Something went wrong, please try again!!!");
          }

          //setLoading(false);
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    }

    props.handleSuccessfulCreateSnackbar(
      `Your contribution of =N= ${props.contributedAmount} is recieved. Please enusre to place your order once you are done with all contributions `
    );

    // history.push("/thankyou/online/success");
    history.push(`/targets/credits`);
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess}
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
