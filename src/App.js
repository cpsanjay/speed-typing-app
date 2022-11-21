// import { GlobalStyle } from "./Styles/global";
// import TypingBox from "./Components/TypingBox";
// import Footer from "./Components/Footer";

// import { useTheme } from "./Context/ThemeContext";
// import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
