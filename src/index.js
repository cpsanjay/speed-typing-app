import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { TextModeContextProvider } from "./Context/TestModes";
import { ThemeContextProvider } from "./Context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TextModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TextModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
