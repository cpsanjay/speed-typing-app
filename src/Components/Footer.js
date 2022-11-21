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
      <div className="footer-links">Links</div>
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
  );
};

export default Footer;
