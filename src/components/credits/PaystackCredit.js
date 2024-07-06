import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./../../apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
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
    // publicKey: "pk_live_5700e72ac96f8aafda7af34e76b1dcfd1b6ec8b2", //wholeroof live
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
    const transData = {
      orderNumber: props.data.orderNumber,
      customerName: props.data.customerName,
      customerPhoneNumber: props.data.customerPhoneNumber,
      customerEmailAddress: props.data.customerEmailAddress,
      recipientName: props.data.recipientName,
      recipientPhoneNumber: props.data.recipientPhoneNumber,
      recipientAddress: props.data.recipientAddress,
      nearestBusstop: props.data.nearestBusstop,
      postalCode: props.data.postalCode,
      recipientCountry: props.data.recipientCountry,
      recipientState: props.data.recipientState,
      recipientCity: props.data.recipientCity,
      deliveryMode: props.data.deliveryMode,
      vatRate: props.data.vatRate,
      vat: props.data.vat,
      currency: props.data.currency,
      totalWeight: props.data.totalWeight,
      payOnDeliveryMaxWeightInKg: props.data.payOnDeliveryMaxWeightInKg,
      implementVatCollection: props.data.implementVatCollection,
      recipientEmailAddress: props.data.recipientEmailAddress,
      totalDeliveryCost: props.data.totalDeliveryCost,
      totalProductCost: props.data.totalProductCost,
      paymentMethod: props.data.paymentMethod,
      paymentStatus: props.data.paymentStatus,
      orderedBy: props.data.orderedBy,
      salesTax: props.data.salesTax,
      origin: props.data.origin,
      implementSalesTaxCollection: props.data.implementSalesTaxCollection,
      allowOriginSalesTax: props.data.allowOriginSalesTax,
      revenue: props.data.revenue,

      recipientCountryName: props.data.recipientCountryName,
      recipientStateName: props.data.recipientStateName,
      recipientCityName: props.data.recipientCityName,
      deliveryStatus: props.data.deliveryStatus,
      deliveryMode: props.data.deliveryMode,
      daysToDelivery: props.data.daysToDelivery,

      salesPreference: props.data.salesPreference,
      dealDeliveryMode: props.data.dealDeliveryMode,
      dealStatus: props.data.dealStatus,
      dealCode: props.data.dealCode,
      dealType: props.data.dealType,
      dealCentralizedDeliveryLocation:
        props.data.dealCentralizedDeliveryLocation,
      dealCentralizedAgreedDeliveryCost:
        props.data.dealCentralizedAgreedDeliveryCost,
      dealDecentralizedDeliveryLocation:
        props.data.dealDecentralizedDeliveryLocation,
      dealDecentralizedAgreedDeliveryCost:
        props.data.dealDecentralizedAgreedDeliveryCost,
      showDealPaymentDetails: props.data.showDealPaymentDetails,
      dealPaymentPreference: props.data.dealPaymentPreference,
      dealRedemptionCode: props.data.dealRedemptionCode,
      requestDealRedemptionCode: props.data.requestDealRedemptionCode,
      isAContributoryDeal: props.data.isAContributoryDeal,
      dealOwner: props.data.dealOwner,
      dealOwnerEntity: props.data.dealOwnerEntity,
      dealInitialPercentageContribution:
        props.data.dealInitialPercentageContribution,
      dealMaximumInstallmentAllowed: props.data.dealMaximumInstallmentAllowed,
      includeGatewayChargesInPrice: props.data.includeGatewayChargesInPrice,
      gatewayFixedCharge: props.data.gatewayFixedCharge,
      gatewayRateCharge: props.data.gatewayRateCharge,
      isACreditDeal: props.data.isACreditDeal,
    };

    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);

        const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });

          props.productList.map((cart, index) => {
            const data = {
              orderNumber: props.data.orderNumber,
              transactionId: transId,
              product: cart.product,
              orderedPrice: cart.price,
              customerName: props.data.customerName,
              customerPhoneNumber: props.data.customerPhoneNumber,
              customerEmailAddress: props.data.customerEmailAddress,
              recipientName: props.data.recipientName,
              recipientPhoneNumber: props.data.recipientPhoneNumber,
              recipientAddress: props.data.recipientAddress,
              nearestBusstop: props.data.nearestBusstop,
              postalCode: props.data.postalCode,
              recipientCountry: props.data.recipientCountry,
              recipientState: props.data.recipientState,
              recipientCity: props.data.recipientCity,
              deliveryMode: props.data.deliveryMode,
              vatRate: props.data.vatRate,

              vat: props.data.implementVatCollection
                ? cart.isVatable
                  ? (props.data.vatRate / 100) * cart.price * cart.quantity
                  : 0
                : 0,
              currency: props.data.currency,
              totalWeight: props.data.totalWeight,
              payOnDeliveryMaxWeightInKg: props.data.payOnDeliveryMaxWeightInKg,
              implementVatCollection: props.data.implementVatCollection,
              recipientEmailAddress: props.data.recipientEmailAddress,
              totalDeliveryCost: props.data.totalDeliveryCost,
              totalProductCost: props.data.totalProductCost,
              paymentMethod: props.data.paymentMethod,
              paymentStatus: props.data.paymentStatus,

              cartId: cart.id,
              quantityAdddedToCart: cart.quantity,
              orderedQuantity: cart.quantity,
              dateAddedToCart: cart.dateAddedToCart,
              currency: props.data.currency,
              paymentMethod: props.data.paymentMethod,

              orderedBy: cart.cartHolder,
              salesTax: props.data.implementSalesTaxCollection
                ? props.data.allowOriginSalesTax
                  ? (cart.price *
                      cart.quantity *
                      props.data.prevailingSalesTax) /
                    100
                  : (cart.price *
                      cart.quantity *
                      props.data.destinationSalesTax) /
                    100
                : 0,
              origin: props.data.origin,
              implementSalesTaxCollection:
                props.data.implementSalesTaxCollection,
              allowOriginSalesTax: props.data.allowOriginSalesTax,
              isVatable: cart.isVatable,
              revenue: props.data.allowCentralCommission
                ? cart.revenueMarginShouldPrevail
                  ? cart.revenueMargin * cart.quantity
                  : (props.data.commissionRate / 100) *
                    cart.price *
                    cart.quantity
                : cart.revenueMarginShouldPrevail
                ? cart.revenueMargin * cart.quantity
                : null,

              recipientCountryName: props.data.recipientCountryName,
              recipientStateName: props.data.recipientStateName,
              recipientCityName: props.data.recipientCityName,
              deliveryStatus: props.data.deliveryStatus,
              deliveryMode: props.data.deliveryMode,
              daysToDelivery: props.data.daysToDelivery,

              salesPreference: props.data.salesPreference,
              dealDeliveryMode: props.data.dealDeliveryMode,
              dealStatus: props.data.dealStatus,
              dealCode: props.data.dealCode,
              dealType: props.data.dealType,
              dealCentralizedDeliveryLocation:
                props.data.dealCentralizedDeliveryLocation,
              dealCentralizedAgreedDeliveryCost:
                props.data.dealCentralizedAgreedDeliveryCost,
              dealDecentralizedDeliveryLocation:
                props.data.dealDecentralizedDeliveryLocation,
              dealDecentralizedAgreedDeliveryCost:
                props.data.dealDecentralizedAgreedDeliveryCost,
              showDealPaymentDetails: props.data.showDealPaymentDetails,
              dealPaymentPreference: props.data.dealPaymentPreference,
              dealRedemptionCode: props.data.dealRedemptionCode,
              requestDealRedemptionCode: props.data.requestDealRedemptionCode,

              isAContributoryDeal: props.data.isAContributoryDeal,
              dealOwner: props.data.dealOwner,
              dealOwnerEntity: props.data.dealOwnerEntity,
              dealInitialPercentageContribution:
                props.data.dealInitialPercentageContribution,
              dealMaximumInstallmentAllowed:
                props.data.dealMaximumInstallmentAllowed,
              includeGatewayChargesInPrice:
                props.data.includeGatewayChargesInPrice,
              gatewayFixedCharge: props.data.gatewayFixedCharge,
              gatewayRateCharge: props.data.gatewayRateCharge,
              isACreditDeal: props.data.isACreditDeal,
            };

            if (data) {
              const createForm = async () => {
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${props.token}`;
                const response = await api.post(`/orders`, data);
                if (response.data.status === "success") {
                  dispatch({
                    type: CREATE_ORDER,
                    payload: response.data.data.data,
                  });
                  //setLoading(false);
                } else {
                  props.handleFailedSnackbar(
                    "Something went wrong, please try again!!!"
                  );
                }
              };
              createForm().catch((err) => {
                //props.handleFailedSnackbar();
                console.log("err:", err.message);
              });
            } else {
              //props.handleFailedSnackbar("Something went wrong, please try again!!!");
            }
          });
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
    } //end of the transdate if statement

    //capture the target details and contributions

    const targetData = {
      amountAlreadyContributed:
        props.amountAlreadyContributed + props.contributedAmount,
      currentInstallmentRound: props.currentInstallmentRound + 1,
      isACreditDeal: props.isACreditDeal,
      dealStatus: props.dealStatus,
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
            isACreditDeal: props.isACreditDeal,
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
      `We have recieved  your order and will process it as soon as possible`
    );
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
