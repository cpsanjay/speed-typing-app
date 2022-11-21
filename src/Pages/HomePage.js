import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { ThemeProvider } from "styled-components";
import Header from "../Components/Header";
import { GlobalStyle } from "../Styles/global";
import Footer from "./../Components/Footer";
import TypingBox from "./../Components/TypingBox";

const HomePage = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyle />
        <Header />
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
