import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { TextModeContextProvider } from "./Context/TestModes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TextModeContextProvider>
      <App />
    </TextModeContextProvider>
  </React.StrictMode>
);
