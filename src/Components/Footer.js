import React from "react";
import Select from "react-select";
import { useTheme } from "../Context/ThemeContext";
import { themeOptions } from "../Styles/theme";

const Footer = () => {
  const { setTheme } = useTheme();
  const handleThemeChange = (e) => {
    setTheme(e.value);
  };

  return (
    <div className="footer">
      <div className="footer-links">Links</div>
      <div className="theme-options">
        <Select
          options={themeOptions}
          menuPlacement="top"
          onChange={(e) => handleThemeChange(e)}
        />
      </div>
    </div>
  );
};

export default Footer;
