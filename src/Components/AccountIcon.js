import React, { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";

import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Context/AlertContext";
import GoogleButton from "react-google-button";
import { Box } from "@mui/system";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTheme } from "../Context/ThemeContext";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(2px)",
  },
  box: {
    width: 400,
    textAlign: "center",
    border: "2px solid",
  },
}));

const AccountIcon = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { setAlert } = useAlert();
  const { theme } = useTheme();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountIconClick = () => {
    if (user) {
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  const handleValueChange = (e, v) => {
    setValue(v);
  };

  const logout = () => {
    auth.signOut().then((ok) => {
      setAlert({
        open: true,
        type: "success",
        message: "Logged out",
      });
    });
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          type: "success",
          message: "Logged in",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          open: true,
          type: "error",
          message: "not able to use google authentication",
        });
      });
  };

  const classes = useStyles();

  return (
    <div>
      <PermIdentityIcon onClick={handleAccountIconClick} />
      {user && <LogoutIcon onClick={logout} style={{ marginLeft: "5px" }} />}
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.box}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              <Tab
                label="login"
                style={{ color: theme.title, backgroundColor: "black" }}
              ></Tab>
              <Tab
                label="signup"
                style={{ color: theme.title, backgroundColor: "black" }}
              ></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignupForm handleClose={handleClose} />}
          <Box>
            <span style={{ display: "block", padding: "1rem" }}>OR</span>
            <GoogleButton
              style={{ width: "100%" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
