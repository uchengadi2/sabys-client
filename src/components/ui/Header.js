import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { AppBar, IconButton, TextField, Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
//import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
//import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

import logo from "./../../assets/logo/logo.png";
import { RouterRounded, Search } from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import history from "../../history";
import UserLogin from "./../users/UserLogin";
import LoginForm from "../authForms/LoginForm";
import UserSignUp from "../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import UserLogOut from "../users/UserLogOut";
import { Fragment } from "react";
import ShowCustomerCart from "../carts/ShowCustomerCart";
import CheckoutPage from "../carts/CheckoutPage";
import SearchPage from "../search/SearchPage";
import facebook from "./../../assets/facebook.svg";
import twitter from "./../../assets/twitter.svg";
import linkedIn from "./../../assets/linkedin.svg";
import instagram from "./../../assets/instagram.svg";
import Categories from "../Categories";
import { padding } from "@mui/system";
import api from "./../../apis/local";
import { FaLaptopHouse } from "react-icons/fa";
import OrderPage from "../orders/OrderPage";
import ProfileLayout from "../ProfileLayout";
import Dashboard from "../Dashboard/Dashboard";
import MainDashboard from "../Dashboard/MainDashboard";
import OwnTargetsPage from "../targets/OwnTargetsPage";
import OwnCreditScheme from "../credits/OwnCreditScheme";

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    //target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: 0,
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "11em",
    width: "12em",
    marginLeft: -16,
    //marginLeft: 0,
    marginRight: 50,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "6.5em",
    },
  },
  logoMobile: {
    height: "3em",
    width: "3em",
    //width: 30,
    marginLeft: -30,
    marginRight: "1.5px",
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "4em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "4em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logoContainerMobile: {
    padding: 0,
    marginLeft: "-10px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "15px",
    height: "45px",
    width: "80px",
    fontSize: "13px",
    fontWeight: "500px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "20px",
    marginRight: "10px",
    height: "45px",
    width: "100px",

    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  cart: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "3px",
    marginRight: "2px",
    height: "45px",
    fontSize: "13px",
    fontWeight: "500px",
    width: "40px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  search: {
    //...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "10px",
    marginRight: "0px",
    //height: "45px",
    // width: "30px",
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  searchMobile: {
    //...theme.typography.estimate,
    borderRadius: "30%",
    marginLeft: "10px",
    marginRight: "0px",
    //height: "45px",
    //width: "5%",
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  checkout: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "3px",
    marginRight: "2px",
    height: "45px",
    width: "70px",
    fontSize: "13px",
    fontWeight: "500px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  target: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "2px",
    marginRight: "1px",
    height: "45px",
    width: "70px",
    fontSize: "13px",
    fontWeight: "500px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  credit: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "2px",
    marginRight: "1px",
    height: "45px",
    width: "70px",
    fontSize: "13px",
    fontWeight: "500px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  profile: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "3px",
    marginRight: "2px",
    height: "45px",
    width: "50px",
    fontSize: "13px",
    fontWeight: "500px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.9,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    //marginLeft: "auto",
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.green,
    marginLeft: "0px",
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    // zIndex: theme.zIndex.modal + 1,
    //backgroundColor: theme.palette.common.white,

    "&:hover": {},
  },
  topappbar: {
    // zIndex: theme.zIndex.modal + 1,
    height: 50,
    "&:hover": {},
  },
  buttonSignOut: {
    ...theme.typography.signOut,
    borderRadius: "250px",
    marginLeft: "30px",
    marginRight: "10px",
    height: "45px",
    width: "110px",
    "&:hover": {
      backgroundColor: theme.palette.common.orange,
      color: "white",
    },
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "white",
    },
  },
  rootMobile: {
    maxWidth: "100%",
    width: "100%",
    height: 20,
    "& .MuiFilledInput-root": {
      background: "white",
    },
  },
  icon: {
    height: "1.7em",
    width: "1.7em",

    [theme.breakpoints.down("xs")]: {
      height: "1em",
      width: "1em",
    },
  },
  topHeader: {
    backgroundColor: "#125C13",
  },
  socialPos: {
    marginLeft: "15em",
  },
  socialPosUnlogged: {
    marginLeft: "45em",
  },
}));

const Header = (props) => {
  const ref = useRef(null);
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const [category, setCategory] = useState("all");
  const [categoryList, setCategoryList] = useState([]);
  const [itemType, setItemType] = useState("");
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [searchText, setSearchText] = useState();
  const [role, setRole] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users/${props.userId}`);
      const workingData = response.data.data.data;
      // workingData.map((user) => {
      //   allData.push({ id: user._id, name: user.name });
      // });
      const name = workingData.name;
      const email = workingData.email;
      const role = workingData.role;

      setUserName(name);
      setUserEmail(email);
      setRole(role);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
    setOpenMenu(true);
  };

  function keyPress(e) {
    if (e.key === "Enter") {
      // Do code here
      //e.preventDefault();
      return (
        <SearchPage
          component={Link}
          to={`/${category}/courses/${searchText}`}
        />
      );
    }
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setItemType(event.target.value);
  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };
  const handleLoginDialogCloseStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");

    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
    setOpenLoginForm(false);
    setOpenDrawer(false);
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(true);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");

    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
    setOpenSignUpForm(false);
    setOpenDrawer(false);
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(true);
  };

  const handleCurrentClick = () => {
    ref.current.focus();
  };

  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };
  const handleMakeOpenForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(true);
    setOpenLoginForm(false);
  };
  const handleMakeCloseForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(false);
    setOpenLoginForm(false);
  };
  const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };

  const handleLogOutDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLogOut(false);
    setOpenDrawer(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  //get the vendor list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderLoginSignOffButton = () => {
    //let size = Object.values(props.token).length;
    //console.log("this size of this tokeeeen:", parseInt(size));

    if (props.token === undefined) {
      return (
        <Fragment>
          {/* <Button
            variant="contained"
            disableRipple
            component={Link}
            to="/"
            // color="secondary"
            className={classes.checkout}
            //onClick={() => [setOpenLoginForm(true), history.push("/")]}
            //onClick={() => [setOpenLoginForm(true)]}
          >
            Career
          </Button> */}
          <Button
            variant="contained"
            // component={Link}
            // to="/logout"
            color="secondary"
            className={classes.button}
            //onClick={() => [setOpenLoginForm(true), history.push("/")]}
            onClick={() => [setOpenLoginForm(true)]}
          >
            Sign In
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {role === "admin" && (
            <Button
              onClick={() => <MainDashboard />}
              disableRipple
              component={Link}
              to={`/dashboard/maindashboard`}
              className={classes.cart}
            >
              Dashboard
            </Button>
          )}
          <Button
            onClick={() => <OrderPage />}
            disableRipple
            component={Link}
            // to={`/carts/${props.userId}`}
            to={`/orders/orders`}
            className={classes.cart}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Orders
          </Button>

          <Button
            onClick={() => <ShowCustomerCart />}
            disableRipple
            component={Link}
            // to={`/carts/${props.userId}`}
            to={`/carts/carts`}
            className={classes.checkout}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            {`Cart` + `(${props.cartCounter})`}
          </Button>
          <Button
            onClick={() => <CheckoutPage />}
            disableRipple
            component={Link}
            // to={`/checkouts/${props.userId}`}
            to={`/checkouts/checkouts`}
            className={classes.checkout}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Checkout
          </Button>
          <Button
            onClick={() => <OwnTargetsPage />}
            disableRipple
            component={Link}
            // to={`/checkouts/${props.userId}`}
            to={`/targets/targets`}
            className={classes.target}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Target Scheme
          </Button>
          <Button
            onClick={() => <OwnCreditScheme />}
            disableRipple
            component={Link}
            // to={`/checkouts/${props.userId}`}
            to={`/targets/credits`}
            className={classes.credit}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Credit Scheme
          </Button>
          <Button
            onClick={() => <ProfileLayout />}
            disableRipple
            component={Link}
            // to={`/profile/${props.userId}`}
            to={`/profile/profile`}
            className={classes.profile}
          >
            {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            Profile
          </Button>
          <Button
            variant="contained"
            // component={Link}
            // to="/logout"
            color="inherit"
            className={classes.buttonSignOut}
            //onClick={() => [setOpenLogOut(true), history.push("/")]}
            onClick={() => [setOpenLogOut(true)]}
          >
            Sign Out
          </Button>
        </Fragment>
      );
    }
  };

  const menuOptions = [];

  const routes = matches
    ? [{ name: "Home", link: "/", activeIndex: 0 }]
    : [
        { name: "Home", link: "/", activeIndex: 0 },

        // { name: "Career", link: `/career`, activeIndex: 1 },
        // { name: "Profile", link: "/profile", activeIndex: 2 },
      ];

  // useEffect(() => {
  //   [...menuOptions, ...routes].forEach((route) => {
  //     switch (window.location.pathname) {
  //       case `${route.link}`:
  //         if (props.value !== route.activeIndex) {
  //           props.setValue(route.activeIndex);
  //           if (
  //             route.selectedIndex &&
  //             RouterRounded.selectedIndex !== props.selectedIndex
  //           ) {
  //             props.setSelectedIndex(route.selectedIndex);
  //           }
  //         }
  //         break;
  //       case "/logout":
  //         props.setValue(5);
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }, [props.value, menuOptions, props.selectedIndex, routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => {
          if (props.token !== undefined || route.link === "/") {
            return (
              <Tab
                key={`${route}${index}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
                aria-owns={route.ariaOwns}
                aria-haspopup={route.ariaPopup}
                onMouseOver={route.mouseOver}
              />
            );
          }
          if (props.token !== undefined || route.link === "/career") {
            return (
              <Tab
                key={`${route}${index}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
                aria-owns={route.ariaOwns}
                aria-haspopup={route.ariaPopup}
                onMouseOver={route.mouseOver}
              />
            );
          }
        })}
      </Tabs>
      {renderLoginSignOffButton()}
    </React.Fragment>
  );

  const renderLoginForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLoginForm}
        //onClose={() => [setOpenLoginForm(false), history.push("/")]}
        onClose={() => [setOpenLoginForm(false)]}
      >
        {/* <DialogContent>
          <UserLogin
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent> */}

        <DialogContent>
          <LoginForm
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        // onClose={() => [setOpenSignUpForm(false), history.push("/")]}
        onClose={() => [setOpenSignUpForm(false)]}
      >
        <DialogContent>
          <UserSignUp
            token={props.token}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleSuccessfulSignUpDialogOpenStatusWithSnackbar={
              handleSuccessfulSignUpDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderLogOutForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLogOut}
        onClose={() => [setOpenLogOut(false), history.push("/")]}
      >
        <DialogContent>
          <UserLogOut
            setToken={props.setToken}
            setUserId={props.setUserId}
            initiateIsSignedOut={props.initiateIsSignedOut}
            handleLogOutDialogOpenStatus={handleLogOutDialogOpenStatus}
            token={props.token}
            resetUserCookie={props.resetUserCookie}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openForgotPasswordForm}
        //onClose={() => [setOpenForgotPasswordForm(false), history.push("/")]}
        onClose={() => [setOpenForgotPasswordForm(false)]}
      >
        <DialogContent>
          <UserPasswordReset
            token={props.token}
            userId={props.userId}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleMakeCloseForgotPasswordFormDialogStatus={
              handleMakeCloseForgotPasswordFormDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderCategoryField = () => {
    return (
      <FormControl variant="outlined">
        {/* <InputLabel id="vendor_city">City</InputLabel> */}
        {itemType === "" ? (
          <InputLabel
            disableAnimation
            shrink={false}
            focused={false}
            id="item_type_label"
            style={{ fontSize: 11, marginTop: -8 }}
          >
            {/* {matchesMDUp ? "Select Category" : "Category"} */}
          </InputLabel>
        ) : null}

        <Select
          labelId="category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
          style={{
            marginTop: 0,
            width: matchesMDUp ? 150 : "100%",
            height: 38,
            marginLeft: 0,
          }}
        >
          <MenuItem key={"all"} value={"all"}>
            {"All"}
          </MenuItem>
          {renderCategoryList()}
        </Select>
        {/* <FormHelperText>Category</FormHelperText> */}
      </FormControl>
    );
  };

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              //   className={
              //     value === route.activeIndex
              //       ? [classes.drawerItem, classes.drawerItemSelected]
              //       : classes.drawerItem
              //   }
              className={classes.drawerItem}
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText disableTypography>{route.name}</ListItemText>
            </ListItem>
          ))}

          {props.token === undefined ? (
            <ListItem
              className={classes.drawerItemEstimate}
              // onClick={() => {
              //   setOpenDrawer(false);
              //   props.setValue(5);
              // }}
              //onClick={() => [setOpenLoginForm(true), history.push("/")]}
              onClick={() => [setOpenLoginForm(true)]}
              divider
              button
              // component={Link}
              // to="/"
              classes={{
                root: classes.drawerItemEstimate,
                selected: classes.drawerItemSelected,
              }}
              selected={props.value === 5}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                Sign In
              </ListItemText>
            </ListItem>
          ) : (
            <>
              <ListItem
                className={classes.drawerItem}
                onClick={() => [
                  setOpenDrawer(false),
                  props.setValue(5),
                  <OrderPage />,
                ]}
                // onClick={() => [
                //   setOpenLoginForm(false),
                //   history.push(`/orders/${props.userId}`),
                // ]}
                //onClick={() => [setOpenLoginForm(true)]}
                divider
                button
                component={Link}
                // to={`/orders/${props.userId}`}
                to={`/orders/orders`}
                classes={{
                  root: classes.drawerItem,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Orders
                </ListItemText>
              </ListItem>
              <ListItem
                className={classes.drawerItem}
                onClick={() => [
                  setOpenDrawer(false),
                  props.setValue(5),
                  <ShowCustomerCart />,
                ]}
                //onClick={() => [setOpenLoginForm(true), history.push("/")]}
                // onClick={() => [
                //   setOpenMenu(true),
                //   history.push("/"),
                //   <ShowCustomerCart />,
                // ]}
                divider
                button
                component={Link}
                // to={`/carts/${props.userId}`}
                to={`/carts/carts`}
                classes={{
                  root: classes.drawerItem,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Cart
                </ListItemText>
              </ListItem>
              <ListItem
                className={classes.drawerItem}
                onClick={() => [
                  setOpenDrawer(false),
                  props.setValue(6),
                  <CheckoutPage />,
                ]}
                //onClick={() => [setOpenLoginForm(true), history.push("/")]}
                //onClick={() => <CheckoutPage />}
                divider
                button
                component={Link}
                // to={`/checkouts/${props.userId}`}
                to={`/checkouts/checkouts`}
                classes={{
                  root: classes.drawerItem,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Checkout
                </ListItemText>
              </ListItem>
              <ListItem
                className={classes.drawerItem}
                onClick={() => [
                  setOpenDrawer(false),
                  props.setValue(7),
                  <OwnTargetsPage />,
                ]}
                divider
                button
                component={Link}
                to={`/targets/targets`}
                classes={{
                  root: classes.drawerItem,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Target Scheme
                </ListItemText>
              </ListItem>
              <ListItem
                className={classes.drawerItem}
                onClick={() => [
                  setOpenDrawer(false),
                  props.setValue(7),
                  <OwnCreditScheme />,
                ]}
                divider
                button
                component={Link}
                to={`/targets/credits`}
                classes={{
                  root: classes.drawerItem,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Credit Scheme
                </ListItemText>
              </ListItem>
              <ListItem
                className={classes.drawerItem}
                onClick={() => [
                  setOpenDrawer(false),
                  props.setValue(5),
                  <ProfileLayout />,
                ]}
                divider
                button
                component={Link}
                // to={`/profile/${props.userId}`}
                to={`/profile/profile`}
                classes={{
                  root: classes.drawerItem,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Profile
                </ListItemText>
              </ListItem>
              <ListItem
                className={classes.drawerItemEstimate}
                // onClick={() => {
                //   setOpenDrawer(false);
                //   props.setValue(5);
                // }}
                //onClick={() => [setOpenLoginForm(true), history.push("/")]}
                //onClick={() => [setOpenLoginForm(true)]}
                divider
                button
                // component={Link}
                // to="/"
                onClick={() => [setOpenLogOut(true), history.push("/")]}
                classes={{
                  root: classes.drawerItemEstimate,
                  selected: classes.drawerItemSelected,
                }}
                selected={props.value === 5}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Sign Out
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          {/* {matchesMDUp ? (
            <Grid container direction="row" className={classes.topHeader}>
              <Grid item style={{ width: 250 }}>
                <Typography>
                  {" "}
                  <span>Email: sales@eshieldafrica.com</span>
                </Typography>
              </Grid>
              <Grid item style={{ width: 250 }}>
                <Typography>
                  <span>Tel: 0803 937 3978; 0802 469 7155</span>
                </Typography>
              </Grid>
              {props.token && (
                <Grid item style={{ width: 250, marginLeft: 100 }}>
                  <Typography>
                    {" "}
                    <span>{userName}</span>
                  </Typography>
                </Grid>
              )}

              <Grid
                item
                component={"a"}
                href="https://www.facebook.com/eshieldafricab2b/"
                rel="noopener noreferrer"
                target="_blank"
                className={
                  props.token ? classes.socialPos : classes.socialPosUnlogged
                }
              >
                <img
                  alt="facebok logo"
                  src={facebook}
                  className={classes.icon}
                />
              </Grid>
              <Grid
                item
                component={"a"}
                href="https://www.linkedin.com/company/e-shield-africa"
                rel="noopener noreferrer"
                target="_blank"
                style={{ marginLeft: 30 }}
              >
                <img
                  alt="twitter logo"
                  src={linkedIn}
                  className={classes.icon}
                />
              </Grid>
              <Grid
                item
                component={"a"}
                href="https://www.instagram.com/e_shieldafrica/"
                rel="noopener noreferrer"
                target="_blank"
                style={{ marginLeft: 30 }}
              >
                <img
                  alt="instagram logo"
                  src={instagram}
                  className={classes.icon}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row" className={classes.topHeader}>
              <Grid item style={{ width: 180 }}>
                <Typography>
                  {" "}
                  <span style={{ fontSize: 11 }}>
                    Email: sales@eshieldafrica.com
                  </span>
                </Typography>
              </Grid>
              <Grid item style={{ width: 230 }}>
                <Typography>
                  <span style={{ fontSize: 11 }}>
                    Tel: 0803 937 3978; 0802 469 7155
                  </span>
                </Typography>
              </Grid>

              <Grid
                item
                component={"a"}
                href="https://www.facebook.com/eshieldafricab2b/"
                rel="noopener noreferrer"
                target="_blank"
                className={classes.socialPos}
              >
                <img
                  alt="facebok logo"
                  src={facebook}
                  className={classes.icon}
                />
              </Grid>
              <Grid
                item
                component={"a"}
                href="https://www.linkedin.com/company/e-shield-africa"
                rel="noopener noreferrer"
                target="_blank"
                style={{ marginLeft: 30 }}
              >
                <img
                  alt="twitter logo"
                  src={linkedIn}
                  className={classes.icon}
                />
              </Grid>
              <Grid
                item
                component={"a"}
                href="https://www.instagram.com/e_shieldafrica/"
                rel="noopener noreferrer"
                target="_blank"
                style={{ marginLeft: 30 }}
              >
                <img
                  alt="instagram logo"
                  src={instagram}
                  className={classes.icon}
                />
              </Grid>
            </Grid>
          )} */}

          {matchesMDUp ? (
            <Toolbar disableGutters>
              <Button
                onClick={() => props.setValue(0)}
                disableRipple
                component={Link}
                to="/"
                className={classes.logoContainer}
              >
                <img alt="company logo" src={logo} className={classes.logo} />
              </Button>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 20,
                  width: 500,
                }}
              >
                {renderCategoryField()}
                <TextField
                  variant="outlined"
                  className={classes.root}
                  style={{ width: 180, marginLeft: 8 }}
                  onChange={onChangeSearchText}
                  defaultValue={searchText}
                  component={Link}
                  ref={ref}
                  // onKeyDown={(e) => (e.key === 13 ? <SearchPage /> : null)}
                  onKeyDown={(e) => (e.key === 13 ? handleCurrentClick : null)}
                  InputProps={{
                    style: {
                      height: 38,
                    },
                  }}
                />
                <Button
                  onClick={() => [<SearchPage />, handleCurrentClick]}
                  disableRipple
                  component={Link}
                  to={`/${category}/products/${searchText}`}
                  className={classes.search}
                  onKeyDown={(e) => (e.key === 13 ? <SearchPage /> : null)}
                >
                  Search
                </Button>
              </Box>

              {matches ? drawer : tabs}
            </Toolbar>
          ) : (
            <>
              <Toolbar disableGutters>
                <Button
                  onClick={() => props.setValue(0)}
                  disableRipple
                  component={Link}
                  to="/"
                  className={classes.logoContainerMobile}
                >
                  <img
                    alt="company logo"
                    src={logo}
                    className={classes.logoMobile}
                  />
                </Button>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: 1,
                    borderRadius: 5,
                    //width: "70%",
                    marginLeft: "-18px",
                  }}
                >
                  {renderCategoryField()}
                  <TextField
                    variant="outlined"
                    className={classes.rootMobile}
                    style={{ width: "40%", marginLeft: "0.5%" }}
                    onChange={onChangeSearchText}
                    onKeyDown={(e) => (e.key === 13 ? <SearchPage /> : null)}
                    defaultValue={searchText}
                    InputProps={{
                      style: {
                        height: 38,
                      },
                    }}
                  />
                  <Button
                    onClick={() => <SearchPage />}
                    disableRipple
                    component={Link}
                    to={`/${category}/products/${searchText}`}
                    className={classes.searchMobile}
                    style={{ width: "15%" }}
                  >
                    <span style={{ fontSize: 12, marginLeft: "-5px" }}>
                      Search
                    </span>
                  </Button>
                </Box>

                {matches ? drawer : tabs}
              </Toolbar>
              {/* <Toolbar>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 5,
                    width: "78%",
                    //marginLeft: "18px",
                  }}
                >
                  {renderCategoryField()}
                  <TextField
                    variant="outlined"
                    className={classes.rootMobile}
                    style={{ width: "40%", marginLeft: 5 }}
                    onChange={onChangeSearchText}
                    onKeyDown={(e) => (e.key === 13 ? <SearchPage /> : null)}
                    defaultValue={searchText}
                    InputProps={{
                      style: {
                        height: 38,
                      },
                    }}
                  />
                  <Button
                    onClick={() => <SearchPage />}
                    disableRipple
                    component={Link}
                    to={`/${category}/courses/${searchText}`}
                    className={classes.searchMobile}
                  >
                    <span style={{ fontSize: 12, marginLeft: "-8px" }}>
                      Search
                    </span>
                  </Button>
                </Box>
              </Toolbar> */}
            </>
          )}
        </AppBar>
      </ElevationScroll>
      <Box className={classes.toolbarMargin}></Box>
      {renderLoginForm()}
      {renderSignUpForm()}
      {renderForgotPasswordForm()}
      {renderLogOutForm()}
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
    </React.Fragment>
  );
};

export default Header;
