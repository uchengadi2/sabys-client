// export default ProfileLayout;

import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CallToAction from "./ui/CallToAction";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
// import UserMembershipForm from "./membership/UserMembershipForm";
// import UpdateUserMembershipForm from "./membership/UpdateUserMembershipForm";

import revolutionBackground from "./../assets/repeatingBackground.svg";
import infoBackground from "./../assets/infoBackground.svg";
import { Category } from "@material-ui/icons";
import ButtonArrow from "./ui/ButtonArrow";
import AboutUsFormContainer from "./aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./partner/BecomePartnerFormContainer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField, Typography } from "@material-ui/core";
import background from "./../assets/images/footage/footage_image.png";
import history from "./../history";
import data from "./../apis/local";
import UserOwnPasswordChange from "./users/UserOwnPasswordChange";
import UserChangePasswordForm from "./users/UserChangePasswordForm";
import UserOwnNameChangeContainer from "./users/UserOwnNameChangeContainer";
import UpperFooter from "./ui/UpperFooter";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.25rem",
    backgroundColor: theme.palette.common.blue,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  membershipButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 300,
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.25rem",
    backgroundColor: theme.palette.common.green,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  updateMembershipButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 300,
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.25rem",
    backgroundColor: theme.palette.common.grey,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },

  updateMembershipMobileButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 400,
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "0.85rem",
    backgroundColor: theme.palette.common.grey,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },

  membershipMobileButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 400,
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "0.85rem",
    backgroundColor: theme.palette.common.green,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  // root: {
  //   maxWidth: 600,
  //   marginTop: 70,
  // },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "18em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  backgroundMobile: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "7em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  root: {
    maxWidth: "100%",
    width: "100%",
    height: "80vh",
    marginTop: "0.5rem",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "2em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  footer: {
    width: "100%",
    marginTop: "15rem",
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: 800,
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "0.2em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {},
  },
}));

const ProfileLayout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const [user, setUser] = useState({});
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [nameFormOpen, setNameFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [membershipInfo, setMembershipInfo] = useState(false);
  const [updateMembershipInfo, setUpdateMembershipInfo] = useState(false);

  const getUserIdFromLocatStorage = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken["userId"];
  };

  const userId = getUserIdFromLocatStorage();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const updateUserInfoHandler = () => {
    setUpdateUser((prevState) => !prevState);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [{}];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/users/${userId}`);

      const workingData = response.data.data.data;

      setUser(workingData);
      setIsLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateUser]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleMakeChangeNameDialogForm = () => {
    setNameFormOpen(false);
  };

  const handleMakeChangePasswordDialogForm = () => {
    setPasswordFormOpen(false);
  };

  const handleMembershipDialogForm = () => {
    setMembershipInfo(false);
  };

  const handleUpdatedMembershipDialogForm = () => {
    setUpdateMembershipInfo(false);
  };

  const renderChangePasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={passwordFormOpen}
        onClose={() => [
          setPasswordFormOpen(false),
          history.push("/profile/profile"),
        ]}
      >
        <DialogContent>
          <UserChangePasswordForm
            setToken={props.setToken}
            setUserId={props.setUserId}
            token={props.token}
            userId={props.userId}
            updateUserInfoHandler={updateUserInfoHandler}
            handleMakeChangePasswordDialogForm={
              handleMakeChangePasswordDialogForm
            }
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
            handleFailedSnackbar={handleFailedSnackbar}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderChangeNameForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={nameFormOpen}
        onClose={() => [
          setNameFormOpen(false),
          history.push("/profile/profile"),
        ]}
      >
        <DialogContent>
          <UserOwnNameChangeContainer
            existingToken={props.token}
            userId={userId}
            updateUserInfoHandler={updateUserInfoHandler}
            handleMakeChangeNameDialogForm={handleMakeChangeNameDialogForm}
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
            handleFailedSnackbar={handleFailedSnackbar}
            user={user}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderMembershipForm = () => {
    return (
      <Dialog
        fullScreen={matchesXS}
        open={membershipInfo}
        onClose={() => [setMembershipInfo(false), history.push("/profile")]}
      >
        <DialogContent>
          {/* <UserMembershipForm
            token={props.token}
            userId={props.userId}
            updateUserInfoHandler={updateUserInfoHandler}
            handleMembershipDialogForm={handleMembershipDialogForm}
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
            handleFailedSnackbar={handleFailedSnackbar}
            user={user}
          /> */}
        </DialogContent>
      </Dialog>
    );
  };

  const renderUpdateMembershipForm = () => {
    return (
      <Dialog
        fullScreen={matchesXS}
        open={updateMembershipInfo}
        onClose={() => [
          setUpdateMembershipInfo(false),
          history.push("/profile/profile"),
        ]}
      >
        <DialogContent>
          {/* <UpdateUserMembershipForm
            token={props.token}
            userId={props.userId}
            updateUserInfoHandler={updateUserInfoHandler}
            handleUpdatedMembershipDialogForm={
              handleUpdatedMembershipDialogForm
            }
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
            handleFailedSnackbar={handleFailedSnackbar}
            user={user}
          /> */}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      {isLoading && (
        <CircularProgress
          size={80}
          color="inherit"
          style={{ marginTop: 300, marginLeft: 650 }}
        />
      )}
      {matchesMdUp ? (
        !isLoading && (
          <Grid container direction="row" className={classes.root}>
            <Grid item>
              <Box className={classes.root}>
                <Box
                  component="div"
                  id="profileLayout"
                  // onSubmit={onSubmit}
                  sx={{
                    width: 1350,
                    height: 480,
                  }}
                  noValidate
                  autoComplete="off"
                  // style={{ marginTop: 20 }}
                >
                  <Grid
                    container
                    direction="row"
                    className={classes.background}
                  >
                    <Box
                      sx={{
                        width: 400,
                        height: 180,
                      }}
                      noValidate
                      autoComplete="off"
                    ></Box>
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 15 }}
                  >
                    <Grid item>
                      <Typography variant="subtitle1">{user.name}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">{user.email}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Phone Number: {user.phoneNumber}
                      </Typography>
                      {user.isAMember && (
                        <Grid item>
                          <Typography variant="subtitle1">
                            Membership Number: {user.membershipNo}
                          </Typography>
                        </Grid>
                      )}
                      {user.isAMember && (
                        <Grid item>
                          <Typography variant="subtitle1">
                            Membership Status: {user.membershipStatus}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>

                    {/* {!user.isAMember && (
                      <Grid item>
                        <Button
                          variant="contained"
                          className={classes.membershipButton}
                          onClick={() => [setMembershipInfo(true)]}
                        >
                          Complete Membership Form
                        </Button>
                      </Grid>
                    )} */}

                    {/* {user.isAMember && (
                      <Grid item>
                        <Button
                          variant="contained"
                          className={classes.updateMembershipButton}
                          onClick={() => [setUpdateMembershipInfo(true)]}
                        >
                          Update Membership Form
                        </Button>
                      </Grid>
                    )} */}

                    <Grid item>
                      <Button
                        variant="contained"
                        className={classes.sendButton}
                        // onClick={() => setPasswordFormOpen(true)}
                        onClick={() => [setPasswordFormOpen(true)]}
                      >
                        Change Password
                      </Button>
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="center"
                      style={{ marginTop: 20 }}
                    >
                      <Button
                        variant="text"
                        onClick={() => [setNameFormOpen(true)]}
                      >
                        Update User Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item style={{ width: "100%", marginTop: "20px" }}>
              {" "}
              {/*....INFORMATION BLOCK....*/}
            </Grid>
            <Grid item className={classes.footer}>
              <UpperFooter />
            </Grid>
            {renderChangePasswordForm()}
            {renderChangeNameForm()}
            {/* {renderMembershipForm()}
            {renderUpdateMembershipForm()} */}
          </Grid>
        )
      ) : (
        <>
          {!isLoading && (
            <Grid container direction="row" className={classes.rootMobile}>
              <Grid item>
                <Box className={classes.rootMobile}>
                  <Box
                    component="div"
                    id="profileLayout"
                    // onSubmit={onSubmit}
                    sx={{
                      width: 400,
                      height: 480,
                    }}
                    noValidate
                    autoComplete="off"
                    // style={{ marginTop: 20 }}
                  >
                    <Grid
                      container
                      direction="row"
                      className={classes.backgroundMobile}
                    >
                      <Box
                        sx={{
                          width: 400,
                          height: 180,
                        }}
                        noValidate
                        autoComplete="off"
                      ></Box>
                    </Grid>

                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      style={{ marginTop: 15 }}
                    >
                      <Grid item>
                        <Typography variant="subtitle1">{user.name}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {user.email}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Phone Number: {user.phoneNumber}
                        </Typography>
                        {user.isAMember && (
                          <Grid item>
                            <Typography variant="subtitle1">
                              Membership Number: {user.membershipNo}
                            </Typography>
                          </Grid>
                        )}
                        {user.isAMember && (
                          <Grid item>
                            <Typography variant="subtitle1">
                              Membership Status: {user.membershipStatus}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>

                      {/* {!user.isAMember && (
                        <Grid item>
                          <Button
                            variant="contained"
                            className={classes.membershipMobileButton}
                            onClick={() => [setMembershipInfo(true)]}
                          >
                            Complete Membership Form
                          </Button>
                        </Grid>
                      )} */}

                      {/* {user.isAMember && (
                        <Grid item>
                          <Button
                            variant="contained"
                            className={classes.updateMembershipMobileButton}
                            onClick={() => [setUpdateMembershipInfo(true)]}
                          >
                            Update Membership Form
                          </Button>
                        </Grid>
                      )} */}

                      <Grid item>
                        <Button
                          variant="contained"
                          className={classes.sendButton}
                          // onClick={() => setPasswordFormOpen(true)}
                          onClick={() => [setPasswordFormOpen(true)]}
                        >
                          Change Password
                        </Button>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent="center"
                        style={{ marginTop: 20 }}
                      >
                        <Button
                          variant="text"
                          onClick={() => [setNameFormOpen(true)]}
                        >
                          Update User Details
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item style={{ width: "100%", marginTop: "20px" }}>
                {" "}
                {/*....INFORMATION BLOCK....*/}
              </Grid>
              <Grid item className={classes.footer}>
                <UpperFooter />
              </Grid>
              {renderChangePasswordForm()}
              {renderChangeNameForm()}
              {/* {renderMembershipForm()}
              {renderUpdateMembershipForm()} */}
            </Grid>
          )}
        </>
      )}
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
};

export default ProfileLayout;
