import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import history from "./../history";
import theme from "./ui/Theme";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
import useToken from "../custom-hooks/useToken";
import useUserId from "../custom-hooks/useUserId";
import UserLogin from "./users/UserLogin";
import LoginForm from "./authForms/LoginForm";
import Header from "./ui/Header";
import IndexDashboard from "./IndexDashboard";
import Marketplace from "./../components/Marketplace";
import ShowCustomerCart from "./carts/ShowCustomerCart";
import PaymentLayout from "./PaymentLayout";
import ProfileLayout from "./ProfileLayout";
import Snackbar from "@material-ui/core/Snackbar";
import ProductsForCategory from "./products/ProductsForCategory";
import ProductDetails from "./products/ProductDetails";
import CheckoutPage from "./carts/CheckoutPage";
import Categories from "./Categories";
import VendorPartner from "./VendorPartner";
import LogisticsPartner from "./LogisticsPartner";
import Footer from "./ui/Footer";
import CareerPage from "./career/CareerPage";
import ThankYou from "./thankyou/ThankYou";
import MainDashboard from "./Dashboard/MainDashboard";
import Products from "./Dashboard/products/Products";
import ProductCategories from "./Dashboard/products/Categories";
import OrderPage from "./orders/OrderPage";
import SearchPage from "./search/SearchPage";
import RequestQuote from "./quote/RequestQuote";
import FreezePriceForm from "./freeze/FreezePriceForm";
import DericaHome from "./DericaHome";
import PaintHome from "./PaintHome";
import DealHome from "./DealHome";

import api from "./../apis/local";
import WholesaleHome from "./WholesaleHome";
import CommunityHome from "./CommunityHome";
import RetailHome from "./RetailHome";
import FreezePriceHomePageAd from "./freeze/FreezePriceHomePageAd";
import FreezePriceDericaPageAd from "./freeze/FreezePriceDericaPageAd";
import FreezePricePaintPageAd from "./freeze/FreezePricePaintPageAd";
import FreezePriceRetailPageAd from "./freeze/FreezePriceRetailPageAd";
import FreezePriceWholesalePageAd from "./freeze/FreezePriceWholesalePageAd";
import FreezePriceCommunityPageAd from "./freeze/FreezePriceCommunityPageAd";
import FreezePriceDealPageAd from "./freeze/FreezePriceDealPageAdPage";
import DealPropositionAdPage from "./deals/DealPropositionAdPage";
import OwnTargetsPage from "./targets/OwnTargetsPage";
import OwnCreditScheme from "./credits/OwnCreditScheme";
import TargetProductDetailPage from "./targets/TargetProductDetailPage";
import CreditProductDetailPage from "./credits/TargetProductDetailPage";

function App() {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [resetCookie, setResetCookie] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartItemForCheckout, setCartItemForCheckout] = useState(false);
  const [policy, setPolicy] = useState();
  const [cartIsUpdatedAfterRemoval, setCartIsUpdatedAfterRemoval] =
    useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleSuccessfulCreateSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  const handleCartItemForCheckoutBox = () => {
    setCartItemForCheckout(true);
  };

  const renderCartUpdateAfterRemoval = () => {
    setCartIsUpdatedAfterRemoval(true);
    //console.log("this was run");
  };

  const resetUserCookie = () => {
    setResetCookie(true);
    //console.log("this is performed");
  };

  useEffect(() => {
    const fetchData = async () => {
      //setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          status: "unmarked-for-checkout",
          //isDeleted: false,
        },
      });

      const items = response.data.data.data;

      if (!items) {
        return;
      }

      items.map((cart) => {
        allData.push({
          id: cart._id,
        });
      });

      if (!allData) {
        return;
      }

      setCartCounter(allData.length);
    };

    //call the function

    fetchData().catch(console.error);
  }, [userId, token]);

  const cartCounterHandler = (value) => {
    setCartCounter((prevState) => prevState + value);
  };

  return (
    <div className="wrapper">
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            token={token}
            userId={userId}
            cartCounter={cartCounter}
            setToken={setToken ? setToken : null}
            setUserId={setUserId ? setUserId : null}
          />

          <Switch>
            <Route exact path="/">
              <Marketplace
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            {/* <Route exact path="/:preference">
              <Marketplace
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route> */}

            <Route exact path="/categories">
              <Categories
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route exact path="/categories/:categoryId">
              <ProductsForCategory
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/categories/:catSlug/:slug">
              <ProductDetails
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                cartCounterHandler={cartCounterHandler}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/requestquote/:catSlug/:slug">
              <RequestQuote
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                cartCounterHandler={cartCounterHandler}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/freezeprice/:catSlug/:slug">
              <FreezePriceForm
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                cartCounterHandler={cartCounterHandler}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/carts/carts">
              <ShowCustomerCart
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                cartCounterHandler={cartCounterHandler}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
                renderCartUpdateAfterRemoval={renderCartUpdateAfterRemoval}
              />
            </Route>

            <Route path="/checkouts/checkouts">
              <CheckoutPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>

            <Route path="/targets/targets">
              <OwnTargetsPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>

            <Route path="/targets/credits">
              <OwnCreditScheme
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>

            <Route path="/targets/target/:target">
              <TargetProductDetailPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/targets/credit/:target">
              <CreditProductDetailPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleCartItemForCheckoutBox={handleCartItemForCheckoutBox}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>

            <Route path="/orders/orders">
              <OrderPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>

            <Route path="/:categoryId/products/:searchText">
              <SearchPage
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route exact path="/vendors">
              <VendorPartner
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/thankyou/:action/:placementNumber">
              <ThankYou
                token={token}
                userId={userId}
                setToken={setToken ? setToken : {}}
                setUserId={setUserId ? setUserId : {}}
                handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                handleFailedSnackbar={handleFailedSnackbar}
              />
            </Route>
            <Route path="/profile/profile">
              <ProfileLayout
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/career">
              <CareerPage />
            </Route>
            {/* <Route path="/preferences">
              <Preferences />
            </Route> */}

            <Route path="/dashboard/:slug">
              <Dashboard
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/derica">
              <DericaHome
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/paint">
              <PaintHome
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/wholesale">
              <WholesaleHome
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/dealscentral">
              <DealHome
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/retail">
              <RetailHome
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/freezehomepagead">
              <FreezePriceHomePageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/freezedericapagead">
              <FreezePriceDericaPageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>

            <Route path="/freezepaintpagead">
              <FreezePricePaintPageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/freezeretailpagead">
              <FreezePriceRetailPageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/freezewholesalepagead">
              <FreezePriceWholesalePageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/freezecommunitypagead">
              <FreezePriceCommunityPageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/freezedealpagead">
              <FreezePriceDealPageAd
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
            <Route path="/dealproposition">
              <DealPropositionAdPage
                token={token}
                setToken={setToken ? setToken : {}}
                userId={userId}
                setUserId={setUserId ? setUserId : {}}
              />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </div>
  );
}

export default App;
