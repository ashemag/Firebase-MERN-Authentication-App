import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { gray } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

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

const PasswordInput = ({
  setPassword,
  password,
  placeholder = "Enter password",
  controlId = "password",
  formLabel = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <Form.Group controlId={controlId}>
      <StyledFormLabel>{formLabel}</StyledFormLabel>
      <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderBottom: `1px solid ${gray}`,
            borderRadius: 0,
            borderTop: "0px",
            borderLeft: "0px",
            borderRight: "0px",
            textColor: `${gray}`,
            fontWeight: 200,
          }}
        />
        <InputGroup.Append>
          <i
            onClick={togglePasswordVisiblity}
            style={{
              borderBottom: `1px solid ${gray}`,
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              zIndex: 1,
              paddingRight: "10px",
              marginTop: "10px",
              bottom: "2px",
              color: showPassword ? "black" : `${gray}`,
            }}
          >
            {eye}
          </i>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;
