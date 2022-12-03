import React from "react";
import AccountIcon from "./AccountIcon";
import CompareButton from "./CompareButton";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span className="logo-span">monkeytype</span>
        <CompareButton style={{ display: "flex" }} />
      </div>

      <div className="icons">
        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
