import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "../Context/ThemeContext";
import { auth, db } from "../firebaseConfig";
import { useAlert } from "../Context/AlertContext";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(3px)",
  },
  compareBox: {
    width: "auto",
    padding: "1rem",
    border: "1px solid",
    display: "flex",
  },
}));

const CompareButton = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  const { setAlert } = useAlert();

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleModal = () => {
    if (user) {
      setOpen(true);
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "user not logged in",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkUserAvailability = async () => {
    const ref = db.collection("username").doc(`${username}`);
    const response = await ref.get();
    if (response.exists) {
      if (user.uid === response.data().uid) {
        return false;
      }
    }
    return response.exists;
  };

  const handleCompare = async () => {
    if (await checkUserAvailability()) {
      navigate(`/compare/${username}`);
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "invalid username",
      });
    }
  };

  const classes = useStyles();
  const { theme } = useTheme();

  return (
    <div>
      <div
        className="compare-btn"
        style={{
          marginTop: "10px",
          cursor: "pointer",
          color: theme.background,
          background: theme.stats,
          padding: "5px 10px",
          borderRadius: "6px",
        }}
        onClick={handleModal}
      >
        COMPARE
      </div>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.compareBox}>
          <TextField
            type="text"
            varient="outlined"
            label="Enter Username"
            InputLabelProps={{
              style: {
                color: theme.title,
              },
            }}
            InputProps={{
              style: {
                color: theme.title,
              },
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            style={{
              backgroundColor: theme.title,
              color: theme.backgroundColor,
              margin: "5px 10px",
            }}
            onClick={handleCompare}
          >
            Compare
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CompareButton;
