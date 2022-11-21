import { Route, Routes } from "react-router-dom";
import AlertComponent from "./Components/AlertComponent";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <>
      <AlertComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
