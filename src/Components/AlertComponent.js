import { Slide, Snackbar, Alert } from "@mui/material";
import { useAlert } from "../Context/AlertContext";

const AlertComponent = () => {
  const { alert, setAlert } = useAlert();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      open: false,
      message: "",
      type: "",
    });
  };
  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={300}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Slide in={alert.open}>
          <Alert severity={alert.type} onClose={handleClose}>
            {alert.message}
          </Alert>
        </Slide>
      </Snackbar>
    </div>
  );
};

export default AlertComponent;
