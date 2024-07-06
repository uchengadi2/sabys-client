import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import background from "./../../assets/images/home/path.jpg";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 350,
    width: "80%",

    marginLeft: "13em",
    //borderRadius: 30,
    marginTop: "5em",
    marginBottom: "1em",
    padding: 0,
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: 50,
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: 150,
    width: 150,
    marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
    //marginTop: "80px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  search: {
    //...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "10px",
    marginRight: "0px",
    //height: "45px",
    //width: "200px",
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
      color: "white",
    },
  },
  searchMobile: {
    //...theme.typography.estimate,
    borderRadius: "20%",
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
}));

export default function DealSearchBox(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(false);

  const [learningPath, setLearningPath] = useState("retail");
  const [buyingPath, setBuyingPath] = useState(
    props.preference === undefined ? "retail" : props.preference
  );

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${product.imageCover}`;
  }

  const Str = require("@supercharge/strings");

  const changeBuyingPathHandler = (event) => {
    setBuyingPath(event.target.value);

    props.updateDealHandler(event.target.value);
    //props.updateLearningPathInfoInfo();
    props.updateBuyingPathInfoInfo();
  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const renderBuyingPathField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="buyingPath"
            id="buyingPath"
            value={buyingPath}
            onChange={changeBuyingPathHandler}
            label="Shopping Path"
            style={{
              height: 38,
              width: matchesMDUp ? 700 : 300,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <MenuItem value={"retail"}>Retail</MenuItem>
            <MenuItem value={"derica"}>Derica</MenuItem>
            <MenuItem value={"paint"}>Paint</MenuItem>
            <MenuItem value={"wholesale"}>Wholesale(Bulk Purchase)</MenuItem>
            <MenuItem value={"community"}>
              Community Purchase(Shopping In Community)
            </MenuItem>
            <MenuItem value={"deal"}>Grab a Deal</MenuItem>
          </Select>
          <FormHelperText>Choose Shopping Preference</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("search text issss:", searchText);

    props.dealHandler(searchText);
    props.updateDealHandler();
    setLoading(false);
  };

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root}>
          {/* <CardActionArea disableRipple disableTouchRipple> */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: 1,
              borderRadius: 5,
              //width: "70%",
              marginLeft: "-18px",
            }}
          >
            {/* {renderCategoryField()} */}
            <TextField
              variant="outlined"
              className={classes.root}
              style={{ width: "40%", marginLeft: "25%" }}
              onChange={onChangeSearchText}
              // onKeyDown={(e) => (e.key === 13 ? <SearchPage /> : null)}
              //defaultValue={searchText}
              placeholder="Enter Your Deal Code Here"
              InputProps={{
                style: {
                  height: 38,
                },
              }}
            />
            <Button
              //onClick={() => <SearchPage />}
              disableRipple
              //component={Link}
              // to={`/${category}/products/${searchText}`}
              onClick={onSubmit}
              className={classes.search}
              style={{ width: "10%", marginTop: "6.5%" }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <span style={{ fontSize: 12, marginLeft: "-5px" }}>
                  Fetch Deal
                </span>
              )}
            </Button>
          </Box>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 1,
              borderRadius: 5,
              width: "100%",
              marginLeft: "-18px",
            }}
          >
            {/* {renderCategoryField()} */}
            <TextField
              variant="outlined"
              className={classes.rootMobile}
              style={{ width: "55%", marginLeft: "12%" }}
              onChange={onChangeSearchText}
              // onKeyDown={(e) => (e.key === 13 ? <SearchPage /> : null)}
              // defaultValue={searchText}
              placeholder="Enter Your Deal Code Here"
              InputProps={{
                style: {
                  height: 38,
                },
              }}
            />
            <Button
              //onClick={() => <SearchPage />}
              disableRipple
              //component={Link}
              //to={`/${category}/products/${searchText}`}
              onClick={onSubmit}
              className={classes.searchMobile}
              style={{ width: "28%", marginTop: "14%" }}
            >
              {loading ? (
                <CircularProgress
                  size={20}
                  color="inherit"
                  style={{ marginLeft: 250 }}
                />
              ) : (
                <span style={{ fontSize: 12, marginLeft: "-5px" }}>
                  Fetch Deal
                </span>
              )}
            </Button>
          </Box>
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>

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
    </>
  );
}
