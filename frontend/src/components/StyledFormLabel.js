import React from "react";
import { Form } from "react-bootstrap";
import { gray } from "../styles/colors";

const StyledFormLabel = ({ children }) => {
  return (
    <Form.Label
      style={{
        color: gray,
        fontSize: "14px",
        textTransform: "uppercase",
        fontWeight: "bold",
      }}
    >
      {children}
    </Form.Label>
  );
};

export default StyledFormLabel;
