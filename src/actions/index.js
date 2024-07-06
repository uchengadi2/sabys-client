import { formValues } from "redux-form";
import data from "../apis/local";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CREATE_CATEGORY,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  CREATE_USER,
  FETCH_USERS,
  FETCH_USER,
  DELETE_USER,
  EDIT_USER,
  CHANGE_OWN_PASSWORD,
  CHANGE_OWN_NAME,
  CREATE_CITY,
  FETCH_CITIES,
  FETCH_CITY,
  DELETE_CITY,
  EDIT_CITY,
  CREATE_VENDOR,
  FETCH_VENDORS,
  FETCH_VENDOR,
  DELETE_VENDOR,
  EDIT_VENDOR,
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_POLICY,
  FETCH_POLICIES,
  FETCH_POLICY,
  DELETE_POLICY,
  EDIT_POLICY,
  CREATE_ORDER,
  FETCH_ORDERS,
  FETCH_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  FETCH_ASSIGNED_ORDERS,
  FETCH_COMPLETED_ORDERS,
  FETCH_ONTRANSIT_ORDERS,
  MAKE_PAYMENT,
  FETCH_PAYMENTS,
  FETCH_PAYMENT,
  DELETE_PAYMENT,
  EDIT_PAYMENT,
  CREATE_FULLFILLED_PAYMENT,
  FETCH_FULLFILLED_PAYMENTS,
  FETCH_FULLFILLED_PAYMENT,
  DELETE_FULLFILLED_PAYMENT,
  EDIT_FULLFILLED_PAYMENT,
  CREATE_PARTIAL_PAYMENT,
  FETCH_PARTIAL_PAYMENTS,
  FETCH_PARTIAL_PAYMENT,
  DELETE_PARTIAL_PAYMENT,
  EDIT_PARTIAL_PAYMENT,
  CREATE_CART,
  FETCH_CARTS,
  FETCH_CART,
  EDIT_CART,
  DELETE_CART,
  CREATE_RATE,
  FETCH_RATES,
  FETCH_RATE,
  EDIT_RATE,
  DELETE_RATE,
  CREATE_LOGISTICSPARTNER,
  FETCH_LOGISTICSPARTNERS,
  FETCH_LOGISTICSPARTNER,
  EDIT_LOGISTICSPARTNER,
  DELETE_LOGISTICSPARTNER,
  CREATE_TRANSACTION,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  CREATE_COUNTRY,
  FETCH_COUNTRIES,
  FETCH_COUNTRY,
  DELETE_COUNTRY,
  EDIT_COUNTRY,
  CREATE_STATE,
  FETCH_STATES,
  FETCH_STATE,
  DELETE_STATE,
  EDIT_STATE,
  CREATE_LOCATION,
  FETCH_LOCATIONS,
  FETCH_LOCATION,
  DELETE_LOCATION,
  EDIT_LOCATION,
  CREATE_AFFILIATE,
  FETCH_AFFILIATES,
  FETCH_AFFILIATE,
  DELETE_AFFILIATE,
  EDIT_AFFILIATE,
  CREATE_CARRIER,
  FETCH_CARRIERS,
  FETCH_CARRIER,
  DELETE_CARRIER,
  EDIT_CARRIER,
  CREATE_CURRENCY,
  FETCH_CURRENCIES,
  FETCH_CURRENCY,
  DELETE_CURRENCY,
  EDIT_CURRENCY,
  CREATE_SUPPLIER,
  FETCH_SUPPLIERS,
  FETCH_SUPPLIER,
  DELETE_SUPPLIER,
  EDIT_SUPPLIER,
  CREATE_QUOTE,
  FETCH_QUOTES,
  FETCH_QUOTE,
  DELETE_QUOTE,
  EDIT_QUOTE,
  CREATE_FREEZE,
  FETCH_FREEZES,
  FETCH_FREEZE,
  DELETE_FREEZE,
  EDIT_FREEZE,
  CREATE_INVENTORY,
  FETCH_INVENTORIES,
  FETCH_INVENTORY,
  DELETE_INVENTORY,
  EDIT_INVENTORY,
  CREATE_DEAL,
  FETCH_DEALS,
  FETCH_DEAL,
  EDIT_DEAL,
  DELETE_DEAL,
  CREATE_COMMUNITY,
  FETCH_COMMUNITIES,
  FETCH_COMMUNITY,
  EDIT_COMMUNITY,
  DELETE_COMMUNITY,
  CREATE_TARGET,
  FETCH_TARGET,
  FETCH_TARGETS,
  EDIT_TARGET,
  DELETE_TARGET,
  CREATE_CONTRIBUTION,
  FETCH_CONTRIBUTIONS,
  FETCH_CONTRIBUTION,
  EDIT_CONTRIBUTION,
  DELETE_CONTRIBUTION,
} from "./types";

//authentication and authorization  operations

// export const signIn = (userId) => {
//   return {
//     type: SIGN_IN,
//     payload: userId,
//   };
// };

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signUp = (formValues) => {
  return async (dispatch) => {
    const response = await data.post("/users/signup", formValues);
    dispatch({ type: SIGN_UP, payload: response.data });
  };
};

export const signIn = (formValues) => {
  return async (dispatch) => {
    const response = await data.post("/users/login", formValues);

    if (response.status === 200) {
      //document.cookie = "jwt=" + response.data.token;
      //localStorage.setItem("token", JSON.stringify(response.data.token));
      // console.log("this token is:", token);
      dispatch({ type: SIGN_IN, payload: response.data });
      // history.push("/");
    } else {
      console.log("something went wrong here");
    }
  };
};
//category resources crud operations
export const createCategory = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/categories", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CATEGORY, payload: response.data });
    // history.push("/");
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await data.get("/categories");
    dispatch({ type: FETCH_CATEGORIES, payload: response.data.data.data });
  };
};

export const fetchCategory = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/categories/${id}`);
    dispatch({ type: FETCH_CATEGORY, payload: response.data.data });
  };
};

export const editCategory = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/categories/${id}`, formValues);
    dispatch({ type: EDIT_CATEGORY, payload: response.data.data });
    history.push("/");
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    await data.delete(`/categories/${id}`);
    dispatch({ type: DELETE_CATEGORY, payload: id });
    history.push("/");
  };
};

//user resource crud operation
export const createUser = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/users", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_USER, payload: response.data });
    history.push("/");
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await data.get("/users");
    dispatch({ type: FETCH_USERS, payload: response.data.data.data });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/users/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const editUser = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/users/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    history.push("/users");
  };
};

export const changeOwnName = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("this is the formvalues:", formValues, "token is:", token);
  return async (dispatch) => {
    const response = await data.patch(`/users/${id}`, formValues);
    console.log("this is the response at indexjs:", response);
    dispatch({ type: CHANGE_OWN_NAME, payload: response.data.status });
    //history.push("/profile");
  };
};

export const changeOwnPassword = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/users/updateMyPassword/`, formValues);
    dispatch({ type: CHANGE_OWN_PASSWORD, payload: response.data });
    // history.push("/profile");
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await data.delete(`/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
    history.push("/");
  };
};

////////////////////////////////////////////////////////

//city resource crud operation
export const createCity = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/cities", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CITY, payload: response.data });
    history.push("/");
  };
};

export const fetchCities = () => {
  return async (dispatch) => {
    const response = await data.get("/cities");
    dispatch({ type: FETCH_CITIES, payload: response.data.data.data });
  };
};

export const fetchCity = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/cities/${id}`);
    dispatch({ type: FETCH_CITY, payload: response.data });
  };
};

export const editCity = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/cities/${id}`, formValues);
    dispatch({ type: EDIT_CITY, payload: response.data });
    history.push("/");
  };
};

export const deleteCity = (id) => {
  return async (dispatch) => {
    await data.delete(`/cities/${id}`);
    dispatch({ type: DELETE_CITY, payload: id });
    history.push("/");
  };
};

/////////////////////////////////////////////////////////////////////

//vendor resource crud operation
export const createVendor = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch) => {
    const response = await data.post("/vendors", formValues);
    console.log("this is the response from vendor creation");

    dispatch({ type: CREATE_VENDOR, payload: response.data });
    // history.push("/orders");
  };
};

export const fetchVendors = () => {
  return async (dispatch) => {
    const response = await data.get("/vendors");
    dispatch({ type: FETCH_VENDORS, payload: response.data.data.data });
  };
};

export const fetchVendor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/vendors/${id}`);
    dispatch({ type: FETCH_VENDOR, payload: response.data });
  };
};

export const editVendor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/vendors/${id}`, formValues);
    dispatch({ type: EDIT_VENDOR, payload: response.data });
    history.push("/");
  };
};

export const deleteVendor = (id) => {
  return async (dispatch) => {
    await data.delete(`/vendors/${id}`);
    dispatch({ type: DELETE_VENDOR, payload: id });
    history.push("/");
  };
};

///////////////////////////////////////////////////////////////////

//product resource crud operation
export const createProduct = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/products", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    history.push("/");
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await data.get("/products");
    dispatch({ type: FETCH_PRODUCTS, payload: response.data.data.data });
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/products/${id}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
  };
};

export const editProduct = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/products/${id}`, formValues);
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
    history.push("/");
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await data.delete(`/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    history.push("/");
  };
};

//////////////////////////////////////////////////////////////////

//policy resource crud operation
export const createPolicy = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/policies", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_POLICY, payload: response.data });
    history.push("/");
  };
};

export const fetchPolicies = () => {
  return async (dispatch) => {
    const response = await data.get("/policies");
    dispatch({ type: FETCH_POLICIES, payload: response.data.data.data });
  };
};

export const fetchPolicy = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/policies/${id}`);
    dispatch({ type: FETCH_POLICY, payload: response.data });
  };
};

export const editPolicy = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/policies/${id}`, formValues);
    dispatch({ type: EDIT_POLICY, payload: response.data });
    history.push("/");
  };
};

export const deletePolicy = (id) => {
  return async (dispatch) => {
    await data.delete(`/policies/${id}`);
    dispatch({ type: DELETE_POLICY, payload: id });
    history.push("/");
  };
};

///////////////////////////////////////////////////////////////////////

//order resource crud operation
export const createOrder = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/orders", formValues);

    dispatch({ type: CREATE_ORDER, payload: response.data });
    // history.push("/orders");
  };
};

export const fetchOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({ type: FETCH_ORDERS, payload: response.data.data.data });
  };
};

export const fetchAssignedOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });
    console.log("the orders issssssnew:", response);
    dispatch({ type: FETCH_ASSIGNED_ORDERS, payload: response.data.data.data });
  };
};

export const fetchCompletedOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({
      type: FETCH_COMPLETED_ORDERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchOnTransitOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({
      type: FETCH_ONTRANSIT_ORDERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchOrder = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/orders/${id}`);
    dispatch({ type: FETCH_ORDER, payload: response.data });
  };
};

export const editOrder = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/orders/${id}`, formValues);
    dispatch({ type: EDIT_ORDER, payload: response.data });
    history.push("/");
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    await data.delete(`/orders/${id}`);
    dispatch({ type: DELETE_ORDER, payload: id });
    history.push("/");
  };
};

//////////////////////////////////////////////////////////////////////

//payment resource crud operation
export const makePayment = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: MAKE_PAYMENT, payload: response.data });
    history.push("/");
  };
};

export const fetchPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });
    console.log("the payments:", response);
    dispatch({ type: FETCH_PAYMENTS, payload: response.data.data.data });
  };
};

export const fetchPayment = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({ type: FETCH_PAYMENT, payload: response.data });
  };
};

export const editPayment = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({ type: EDIT_PAYMENT, payload: response.data });
    history.push("/");
  };
};

export const deletePayment = (id) => {
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_PAYMENT, payload: id });
    history.push("/");
  };
};

/////////////////////////////////////Completed Payments Resources ///////////////////////////////////

export const fetchCompletedPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });

    dispatch({
      type: FETCH_FULLFILLED_PAYMENTS,
      payload: response.data.data.data,
    });
  };
};

export const fetchCompletedPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({
      type: FETCH_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
  };
};

export const editCompletedPayment = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({
      type: EDIT_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/orders");
  };
};

export const deleteCompletedPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_FULLFILLED_PAYMENT, payload: id });
    //history.push("/orders");
  };
};

export const createCompletedPayment = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({
      type: CREATE_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/utilities/clusters");
  };
};

//////////////////////////////////////Partial Payments Resources ///////////////////////////////////

export const fetchPartialPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });

    dispatch({
      type: FETCH_PARTIAL_PAYMENTS,
      payload: response.data.data.data,
    });
  };
};

export const fetchPartialPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({
      type: FETCH_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
  };
};

export const editPartialPayment = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({
      type: EDIT_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/orders");
  };
};

export const deletePartialPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_PARTIAL_PAYMENT, payload: id });
    //history.push("/orders");
  };
};

export const createPartialPayment = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({
      type: CREATE_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/utilities/clusters");
  };
};

////////////////////////////////////////////////CART //////////////////////////////////

export const createCart = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch, getState) => {
    const response = await data.post("/carts", formValues);
    dispatch({ type: CREATE_CART, payload: response.data.data.data });
  };
};

export const fetchCarts = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/carts");

    dispatch({ type: FETCH_CARTS, payload: response.data.data.data });
  };
};

export const fetchCart = (id, token) => {
  return async (dispatch) => {
    const response = await data.get(`/carts/${id}`);
    dispatch({ type: FETCH_CART, payload: response.data });
  };
};

export const editCart = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/carts/${id}`, formValues);
    dispatch({ type: EDIT_CART, payload: response.data });
  };
};

export const deleteCart = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/carts/${id}`);
    dispatch({ type: DELETE_CART, payload: id });
  };
};

////////////////////////////////////////////////RATES //////////////////////////////////

export const createRate = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch, getState) => {
    const response = await data.post("/rates", formValues);
    dispatch({ type: CREATE_RATE, payload: response.data.data.data });
  };
};

export const fetchRates = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/rates");

    dispatch({ type: FETCH_RATES, payload: response.data.data.data });
  };
};

export const fetchRate = (id, token) => {
  return async (dispatch) => {
    const response = await data.get(`/rates/${id}`);
    dispatch({ type: FETCH_RATE, payload: response.data });
  };
};

export const editRate = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/rates/${id}`, formValues);
    dispatch({ type: EDIT_RATE, payload: response.data });
  };
};

export const deleteRate = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/rates/${id}`);
    dispatch({ type: DELETE_RATE, payload: id });
  };
};

////////////////////////////////// LOGISTICS PARTNERS ///////////////////////////////

//vendor resource crud operation
// export const createLogisticsPartner = (formValues, token) => {
//   data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   return async (dispatch) => {
//     const response = await data.post("/logisticspartners", formValues);

//     //console.log(response);
//     dispatch({
//       type: CREATE_LOGISTICSPARTNER,
//       payload: response.data.data.data,
//     });
//     //history.push("/vendors");
//   };
// };

// export const fetchLogisticsPartners = (tokens) => {
//   data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
//   return async (dispatch) => {
//     const response = await data.get("/logisticspartners");

//     dispatch({
//       type: FETCH_LOGISTICSPARTNERS,
//       payload: response.data.data.data,
//     });
//   };
// };

// export const fetchLogisticsPartner = (id, token) => {
//   data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   return async (dispatch) => {
//     const response = await data.get(`/logisticspartners/${id}`);
//     dispatch({ type: FETCH_LOGISTICSPARTNER, payload: response.data });
//   };
// };

// export const editLogisticsPartner = (id, formValues, token) => {
//   data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   return async (dispatch) => {
//     const response = await data.patch(`/logisticspartners/${id}`, formValues);
//     dispatch({ type: EDIT_LOGISTICSPARTNER, payload: response.data });
//   };
// };

// export const deleteLogisticsPartner = (id, token) => {
//   data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   return async (dispatch) => {
//     await data.delete(`/logisticspartners/${id}`);
//     dispatch({ type: DELETE_LOGISTICSPARTNER, payload: id });
//   };
// };

///////////////////////////////////////////////////////////////////////

//transaction resource crud operation
export const createTransaction = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/transactions", formValues);

    dispatch({ type: CREATE_TRANSACTION, payload: response.data });
  };
};

export const fetchTransactions = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/transactions", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({ type: FETCH_TRANSACTIONS, payload: response.data.data.data });
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/transactions/${id}`);
    dispatch({ type: FETCH_TRANSACTION, payload: response.data });
  };
};

export const editTransaction = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/transactions/${id}`, formValues);
    dispatch({ type: EDIT_TRANSACTION, payload: response.data });
  };
};

export const deleteTransaction = (id) => {
  return async (dispatch) => {
    await data.delete(`/transactions/${id}`);
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  };
};

////////////////////////////////////////Country///////////////////////////////
//country resources crud operations
export const createCountry = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/countries", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COUNTRY, payload: response.data });
    // history.push("/");
  };
};

export const fetchCountries = () => {
  return async (dispatch) => {
    const response = await data.get("/countries");
    dispatch({ type: FETCH_COUNTRIES, payload: response.data.data.data });
  };
};

export const fetchCountry = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/countries/${id}`);
    dispatch({ type: FETCH_COUNTRY, payload: response.data.data });
  };
};

export const editCountry = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/categories/${id}`, formValues);
    dispatch({ type: EDIT_COUNTRY, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCountry = (id) => {
  return async (dispatch) => {
    await data.delete(`/countries/${id}`);
    dispatch({ type: DELETE_COUNTRY, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////State///////////////////////////////
//state resources crud operations
export const createState = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/states", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_STATE, payload: response.data });
    // history.push("/");
  };
};

export const fetchStates = () => {
  return async (dispatch) => {
    const response = await data.get("/states");
    dispatch({ type: FETCH_STATES, payload: response.data.data.data });
  };
};

export const fetchState = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/states/${id}`);
    dispatch({ type: FETCH_STATE, payload: response.data.data });
  };
};

export const editState = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/states/${id}`, formValues);
    dispatch({ type: EDIT_STATE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteState = (id) => {
  return async (dispatch) => {
    await data.delete(`/states/${id}`);
    dispatch({ type: DELETE_STATE, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Location///////////////////////////////
//location resources crud operations
export const createLocation = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/locations", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_LOCATION, payload: response.data });
    // history.push("/");
  };
};

export const fetchLocations = () => {
  return async (dispatch) => {
    const response = await data.get("/locations");
    dispatch({ type: FETCH_LOCATIONS, payload: response.data.data.data });
  };
};

export const fetchLocation = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/locations/${id}`);
    dispatch({ type: FETCH_LOCATION, payload: response.data.data });
  };
};

export const editLocation = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/locations/${id}`, formValues);
    dispatch({ type: EDIT_LOCATION, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteLocation = (id) => {
  return async (dispatch) => {
    await data.delete(`/locations/${id}`);
    dispatch({ type: DELETE_LOCATION, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Affiliates///////////////////////////////
//affiliate resources crud operations
export const createAffiliate = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/affiliates", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_AFFILIATE, payload: response.data });
    // history.push("/");
  };
};

export const fetchAffiliates = () => {
  return async (dispatch) => {
    const response = await data.get("/affiliates");
    dispatch({ type: FETCH_AFFILIATES, payload: response.data.data.data });
  };
};

export const fetchAffiliate = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/affiliates/${id}`);
    dispatch({ type: FETCH_AFFILIATE, payload: response.data.data });
  };
};

export const editAffiliate = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/affiliates/${id}`, formValues);
    dispatch({ type: EDIT_AFFILIATE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteAffiliate = (id) => {
  return async (dispatch) => {
    await data.delete(`/affiliates/${id}`);
    dispatch({ type: DELETE_AFFILIATE, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Carriers///////////////////////////////
//carriers resources crud operations
export const createCarrier = (formValues) => {
  console.log("formavalues:", formValues);
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/carriers", {
      ...formValues,
      userId,
    });

    console.log(response);
    dispatch({ type: CREATE_CARRIER, payload: response.data });
    // history.push("/");
  };
};

export const fetchCarriers = () => {
  return async (dispatch) => {
    const response = await data.get("/carriers");
    dispatch({ type: FETCH_CARRIERS, payload: response.data.data.data });
  };
};

export const fetchCarrier = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/carriers/${id}`);
    dispatch({ type: FETCH_CARRIER, payload: response.data.data });
  };
};

export const editCarrier = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/carriers/${id}`, formValues);
    dispatch({ type: EDIT_CARRIER, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCarrier = (id) => {
  return async (dispatch) => {
    await data.delete(`/carriers/${id}`);
    dispatch({ type: DELETE_CARRIER, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////currencies///////////////////////////////
//currencies resources crud operations
export const createCurrency = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/currencies", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CURRENCY, payload: response.data });
    // history.push("/");
  };
};

export const fetchCurrencies = () => {
  return async (dispatch) => {
    const response = await data.get("/currencies");
    dispatch({ type: FETCH_CURRENCIES, payload: response.data.data.data });
  };
};

export const fetchCurrency = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/currencies/${id}`);
    dispatch({ type: FETCH_CURRENCY, payload: response.data.data });
  };
};

export const editCurrency = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/currencies/${id}`, formValues);
    dispatch({ type: EDIT_CURRENCY, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCurrency = (id) => {
  return async (dispatch) => {
    await data.delete(`/currencies/${id}`);
    dispatch({ type: DELETE_CURRENCY, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////suppliers///////////////////////////////
//suppliers resources crud operations
export const createSupplier = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/suppliers", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_SUPPLIER, payload: response.data });
    // history.push("/");
  };
};

export const fetchSuppliers = () => {
  return async (dispatch) => {
    const response = await data.get("/suppliers");
    dispatch({ type: FETCH_SUPPLIERS, payload: response.data.data.data });
  };
};

export const fetchSupplier = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/suppliers/${id}`);
    dispatch({ type: FETCH_SUPPLIER, payload: response.data.data });
  };
};

export const editSupplier = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/suppliers/${id}`, formValues);
    dispatch({ type: EDIT_SUPPLIER, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteSupply = (id) => {
  return async (dispatch) => {
    await data.delete(`/suppliers/${id}`);
    dispatch({ type: DELETE_SUPPLIER, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////quotes///////////////////////////////
//quotes resources crud operations
export const createQuote = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/quotes", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_QUOTE, payload: response.data });
    // history.push("/");
  };
};

export const fetchQuotes = () => {
  return async (dispatch) => {
    const response = await data.get("/quotes");
    dispatch({ type: FETCH_QUOTES, payload: response.data.data.data });
  };
};

export const fetchQuote = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/quotes/${id}`);
    dispatch({ type: FETCH_QUOTE, payload: response.data.data });
  };
};

export const editQuote = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/quotes/${id}`, formValues);
    dispatch({ type: EDIT_QUOTE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteQuote = (id) => {
  return async (dispatch) => {
    await data.delete(`/quotes/${id}`);
    dispatch({ type: DELETE_QUOTE, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Freezes///////////////////////////////
//freeze resources crud operations

export const createFreeze = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/freezes", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_FREEZE, payload: response.data });
    // history.push("/");
  };
};

export const fetchFreezes = () => {
  return async (dispatch) => {
    const response = await data.get("/freezes");
    dispatch({ type: FETCH_FREEZES, payload: response.data.data.data });
  };
};

export const fetchFreeze = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/freezes/${id}`);
    dispatch({ type: FETCH_FREEZE, payload: response.data.data });
  };
};

export const editFreeze = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/freezes/${id}`, formValues);
    dispatch({ type: EDIT_FREEZE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteFreeze = (id) => {
  return async (dispatch) => {
    await data.delete(`/freezes/${id}`);
    dispatch({ type: DELETE_FREEZE, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Inventories///////////////////////////////
//inventory resources crud operations

export const createInventory = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/inventories", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_INVENTORY, payload: response.data });
    // history.push("/");
  };
};

export const fetchInventories = () => {
  return async (dispatch) => {
    const response = await data.get("/inventories");
    dispatch({ type: FETCH_INVENTORIES, payload: response.data.data.data });
  };
};

export const fetchInventory = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/inventories/${id}`);
    dispatch({ type: FETCH_INVENTORY, payload: response.data.data });
  };
};

export const editInventory = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/inventories/${id}`, formValues);
    dispatch({ type: EDIT_INVENTORY, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteInventory = (id) => {
  return async (dispatch) => {
    await data.delete(`/inventories/${id}`);
    dispatch({ type: DELETE_INVENTORY, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Deals///////////////////////////////
//Deal resources crud operations

export const createDeal = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/deals", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_DEAL, payload: response.data });
    // history.push("/");
  };
};

export const fetchDeals = () => {
  return async (dispatch) => {
    const response = await data.get("/deals");
    dispatch({ type: FETCH_DEALS, payload: response.data.data.data });
  };
};

export const fetchDeal = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/deals/${id}`);
    dispatch({ type: FETCH_DEAL, payload: response.data.data });
  };
};

export const editDeal = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/deals/${id}`, formValues);
    dispatch({ type: EDIT_DEAL, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteDeal = (id) => {
  return async (dispatch) => {
    await data.delete(`/deals/${id}`);
    dispatch({ type: DELETE_DEAL, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Deals///////////////////////////////
//Community resources crud operations

export const createCommunity = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/communities", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COMMUNITY, payload: response.data });
    // history.push("/");
  };
};

export const fetchCommunities = () => {
  return async (dispatch) => {
    const response = await data.get("/communities");
    dispatch({ type: FETCH_COMMUNITIES, payload: response.data.data.data });
  };
};

export const fetchCommunity = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/communities/${id}`);
    dispatch({ type: FETCH_COMMUNITY, payload: response.data.data });
  };
};

export const editCommunity = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/communities/${id}`, formValues);
    dispatch({ type: EDIT_COMMUNITY, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCommunity = (id) => {
  return async (dispatch) => {
    await data.delete(`/communities/${id}`);
    dispatch({ type: DELETE_COMMUNITY, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Targets///////////////////////////////
//Targets resources crud operations

export const createTarget = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/targets", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_TARGET, payload: response.data });
    // history.push("/");
  };
};

export const fetchTargets = () => {
  return async (dispatch) => {
    const response = await data.get("/targets");
    dispatch({ type: FETCH_TARGETS, payload: response.data.data.data });
  };
};

export const fetchTarget = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/targets/${id}`);
    dispatch({ type: FETCH_TARGET, payload: response.data.data });
  };
};

export const editTarget = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/targets/${id}`, formValues);
    dispatch({ type: EDIT_TARGET, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteTarget = (id) => {
  return async (dispatch) => {
    await data.delete(`/targets/${id}`);
    dispatch({ type: DELETE_TARGET, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Contributions///////////////////////////////
//Contributions resources crud operations

export const createContribution = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/contributions", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CONTRIBUTION, payload: response.data });
    // history.push("/");
  };
};

export const fetchContributions = () => {
  return async (dispatch) => {
    const response = await data.get("/contributions");
    dispatch({ type: FETCH_CONTRIBUTIONS, payload: response.data.data.data });
  };
};

export const fetchContribution = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/contributions/${id}`);
    dispatch({ type: FETCH_CONTRIBUTION, payload: response.data.data });
  };
};

export const editContribution = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/contributions/${id}`, formValues);
    dispatch({ type: EDIT_CONTRIBUTION, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteContribution = (id) => {
  return async (dispatch) => {
    await data.delete(`/contributions/${id}`);
    dispatch({ type: DELETE_CONTRIBUTION, payload: id });
    //history.push("/");
  };
};
