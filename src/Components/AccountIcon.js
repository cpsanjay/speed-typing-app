import React, { useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";

import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 400,
  },
}));

const AccountIcon = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

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
    auth.signOut().then((ok) => alert("logged out"));
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
                style={{ color: "white", backgroundColor: "black" }}
              ></Tab>
              <Tab
                label="signup"
                style={{ color: "white", backgroundColor: "black" }}
              ></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignupForm handleClose={handleClose} />}
        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
