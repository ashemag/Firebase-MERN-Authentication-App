import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import CustomLink from "../components/CustomLink";
import { register, confirmEmail } from "../actions/userActions";
import { H1, Body } from "../styles/typography";
import { gray } from "../styles/colors";
import PasswordInput from "../components/PasswordInput";
import { USER_REGISTER_EMAIL_SENT } from "../constants/userConstants";

const RegisterScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState("Ashe");
  const [lastName, setLastName] = useState("Magalhaes");
  const [email, setEmail] = useState("ashe@cs.stanford.edu");
  const [password, setPassword] = useState("testtesttest");
  const [confirmPassword, setConfirmPassword] = useState("testtesttest");
  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo: registerUserInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: loginUserInfo } = userLogin;

  // const userConfirmEmail = useSelector((state) => state.userConfirmEmail);
  // const {
  //   requested: emailRequested,
  //   confirmed: emailConfirmed,
  // } = userConfirmEmail;

  //const redirect = location.search ? location.search.split("=")[1] : "/";
  // const _id = location.search ? location.search.split("=")[1] : null;
  // console.log(_id);

  useEffect(() => {
    // user clicked on email confirmation link
    // if (_id) {
    //   console.log("confirming email...");
    //  // dispatch(confirmEmail(_id));
    //   // history.push("/");
    //   // user is registered and confirmed
    // } else {
    //   // history.push("/register");
    // }
    if (loginUserInfo) {
      history.push("/");
    } else if (registerUserInfo) {
      history.push(`/login?verify-email=${email}`);
    }
    setErrorMessage(error);
  }, [loginUserInfo, registerUserInfo, error]);

  async function submitHandler(e) {
    e.preventDefault();
    if (!password || !firstName || !lastName || !confirmPassword || !email) {
      setErrorMessage("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        setSuccessMessage(null);
        console.log("calling dispatch...");
        await dispatch(register(firstName, lastName, email, password));
        setSuccessMessage("Verification email sent.");
      } catch (e) {
        setErrorMessage(e["message"]);
      }
    }
  }

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

  return (
    <FormContainer>
      <H1>Register</H1>
      {!loading && errorMessage && (
        <Message variant="danger">{errorMessage}</Message>
      )}
      {!loading && successMessage && !errorMessage && (
        <Message variant="success">{successMessage}</Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstName">
          <StyledFormLabel>First Name</StyledFormLabel>
          <Form.Control
            type="name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              borderBottom: `1px solid ${gray}`,
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderRadius: "0px",
              textColor: `${gray}`,
              fontWeight: 200,
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lastName">
          <StyledFormLabel>Last Name</StyledFormLabel>
          <Form.Control
            type="name"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              borderBottom: `1px solid ${gray}`,
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderRadius: "0px",
              textColor: `${gray}`,
              fontWeight: 200,
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <StyledFormLabel>Email Address</StyledFormLabel>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderBottom: `1px solid ${gray}`,
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderRadius: "0px",
              textColor: `${gray}`,
              fontWeight: 200,
            }}
          ></Form.Control>
        </Form.Group>

        <PasswordInput setPassword={setPassword} password={password} />
        <PasswordInput
          setPassword={setConfirmPassword}
          password={confirmPassword}
          controlId={"confirmPassword"}
          placeholder={"Confirm password"}
          formLabel={"Confirm Password"}
        />

        <Button
          type="submit"
          variant="dark"
          style={{ width: "100%", fontWeight: 400 }}
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <Body>
            Have an Account? <CustomLink linkTo={"/login"}>Login</CustomLink>
          </Body>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
