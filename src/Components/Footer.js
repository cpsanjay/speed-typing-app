import React from "react";
import Select from "react-select";
import { useTheme } from "../Context/ThemeContext";
import { themeOptions } from "../Styles/theme";

const Footer = () => {
  const { setTheme, defaultTheme, theme } = useTheme();
  const handleThemeChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <div className="footer">
      <div className="instructions">
        <div className="hints">
          Press <kbd>Tab</kbd> to open commands
        </div>
      </div>
      <div className="actual-footer">
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/sanjay-cp/" target="_blank">
            LinkedIn
          </a>
          <a href="https://github.com/cpsanjay">Github</a>
          <a href="https://sanjaycp-portfolio.netlify.app/">Portfolio</a>
        </div>
        <div className="theme-options">
          <Select
            options={themeOptions}
            menuPlacement="top"
            onChange={(e) => handleThemeChange(e)}
            defaultValue={{ value: defaultTheme, label: defaultTheme.label }}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: theme.backgroundColor,
              }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme.backgroundColor,
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
