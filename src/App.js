import { GlobalStyle } from "./Styles/global";
import TypingBox from "./Components/TypingBox";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import Header from "./Components/Header";

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyle />
        {/* <h1 style={{ textAlign: "center" }}>Typing Test</h1> */}
        <Header />
        <TypingBox />
        <Footer />
        {/* <h1 style={{ textAlign: "center" }}>Footer</h1> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
