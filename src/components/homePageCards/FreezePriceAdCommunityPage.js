import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import backgroundAd from "./../../assets/images/covers/homepage-ad.png";
import backgroundDerica from "./../../assets/images/covers/derica-cover.png";
import backgroundPaint from "./../../assets/images/covers/paint-cover.png";
import backgroundBulk from "./../../assets/images/covers/bulk-cover.png";
import backgroundCommunity from "./../../assets/images/covers/community-cover.png";
import DericaHome from "../DericaHome";
import FreezePriceDericaPageAd from "../freeze/FreezePriceDericaPageAd";
import { baseURL } from "../../apis/util";

import theme from "../ui/Theme";
import { PropaneSharp } from "@mui/icons-material";
import FreezePricePaintPageAd from "../freeze/FreezePricePaintPageAd";
import FreezePriceRetailPageAd from "../freeze/FreezePriceRetailPageAd";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 100,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "2em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "2.5em",
    marginBottom: "0.5em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: "100%",
    width: "100%",
    // marginLeft: "80px",
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
  actionButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 80,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  actionWholesaleButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },

  backgroundAd: {
    backgroundImage: `url(${backgroundAd})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function FreezePriceAdCommunityPage(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();
  const [minLearnerSlot, setMinLearnerSlot] = useState(1);

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
    imageUrl = `${baseURL}/images/courses/${product.imageCover}`;
  }

  const Str = require("@supercharge/strings");

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple={true}>
          <CardActionArea
            style={{
              marginLeft: "20%",
              //marginRight: "25%",
              width: "50%",
              //height: 150,
            }}
            component={Link}
            to="/freezecommunitypagead"
            onClick={() => <FreezePriceAdCommunityPage />}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              className={classes.backgroundAd}
              justifyContent={matchesSM ? "center" : "space-between"}
              //direction={matchesSM ? "column" : "row"}
              item
              style={{
                height: 135,
                marginTop: 20,
                //marginRight: "25%",
                marginBottom: 20,
                // width: "50%",
              }}
            ></Grid>
          </CardActionArea>
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="column">
            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                <Typography variant="h5" color="textSecondary" component="p">
                  At the heart of eHealt Plus lies a passion for innovation and
                  a commitment to excellence. Our products are the result of
                  cutting-edge research, utilizing the finest ingredients to
                  ensure unparalleled quality. We believe in the synergy of
                  science and nature, creating a harmonious balance that
                  reflects in the efficacy of our offerings.
                </Typography>
                <br />
                <Typography variant="h5" color="textSecondary" component="p">
                  Experience the eHealt Plus difference – a blend of science,
                  nature, and unwavering commitment to your well-being.
                </Typography>
              </CardContent>
            </Grid>

            <Grid
              item
              style={{
                width: "100%",
                marginLeft: "0%",
                marginTop: 10,
                border: "1px dotted grey",
              }}
            >
              <CardContent disableRipple>
                <Typography variant="h5" color="textSecondary" component="p">
                  Indulge in the luxury of self-care, embrace the transformative
                  power of our products, and embark on a path to radiant health
                  and timeless well-being with eHealt Plus products. Welcome to
                  a world where excellence meets elegance
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
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
