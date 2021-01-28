import React from "react";
import { Link } from "react-router-dom";
import { purple as linkColor } from "../styles/colors";

const CustomLink = ({ children, linkTo }) => {
  return (
    <Link to={linkTo} style={{ color: linkColor, textDecoration: "underline" }}>
      {children}
    </Link>
  );
};

export default CustomLink;
