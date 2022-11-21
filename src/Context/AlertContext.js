import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    type: "",
    messages: "",
  });

  const value = {
    alert,
    setAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
