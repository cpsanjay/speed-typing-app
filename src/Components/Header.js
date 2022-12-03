import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from "./AccountIcon";
import CompareButton from "./CompareButton";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span className="logo-span">
          <Link to="/"> monkeytype</Link>
        </span>
        <CompareButton style={{ display: "flex" }} />
      </div>

      <div className="icons">
        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
