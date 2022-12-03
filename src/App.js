import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AlertComponent from "./Components/AlertComponent";
import { useTheme } from "./Context/ThemeContext";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import { GlobalStyle } from "./Styles/global";
import ComparePage from "./Components/ComparePage";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AlertComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/compare/:username" element={<ComparePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
