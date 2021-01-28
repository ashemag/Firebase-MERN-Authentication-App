import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import CustomLink from "../components/CustomLink";
import {
  login,
  sendEmailVerification,
  sendEmailForgetPassword,
} from "../actions/userActions";
import { H1, Body } from "../styles/typography";
import { gray } from "../styles/colors";
import PasswordInput from "../components/PasswordInput";
import StyledFormLabel from "../components/StyledFormLabel";
import { Spacer } from "../styles/responsive";

const LoginScreen = ({ location, history }) => {
  //set state values from initial url
  const initialEmailValue =
    location.search && location.search.split("=")[1]
      ? location.search.split("=")[1]
      : "";

  const initialVerifyEmail =
    location.search && location.search.includes("verify-email");

  const [verifyEmail, setVerifyEmail] = useState(initialVerifyEmail);
  const [email, setEmail] = useState(initialEmailValue);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resendVerifyEmail, setResendVerifyEmail] = useState(null);
  const [
    disableForgetPasswordButton,
    setDisableForgetPasswordButton,
  ] = useState(false);
  const [disableVerifyEmailButton, setDisableVerifyEmailButton] = useState(
    false
  );

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading,
    error,
    userInfo,
    emailVerificationSent,
    emailPasswordResetSent,
  } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.verified) {
      history.push("/");
    }

    if (error) {
      setErrorMessage(error);
    }

    // if user not verified, add resend verification button
    if (
      error &&
      error === "This email is not yet verified. Please check your inbox."
    ) {
      setResendVerifyEmail(true);
    } else {
      setResendVerifyEmail(false);
    }

    if (emailVerificationSent) {
      setSuccessMessage("Email verification sent.");
    }

    if (emailPasswordResetSent) {
      setSuccessMessage("Password reset email sent.");
    }
  }, [history, userInfo, error, emailVerificationSent, emailPasswordResetSent]);

  const resetMessages = () => {
    setVerifyEmail(false);
    setResendVerifyEmail(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  async function submitHandler(e) {
    e.preventDefault();
    resetMessages();

    // check password inputs
    if (!password || !email) {
      setErrorMessage("Please fill in all fields");
    } else {
      try {
        dispatch(login(email, password));
      } catch (error) {
        setSuccessMessage(null);
        setErrorMessage(error);
      }
    }
  }

  async function handleForgetPassword() {
    resetMessages();
    if (!email) {
      setErrorMessage("Please add an email");
    } else {
      try {
        dispatch(sendEmailForgetPassword(email));
        setDisableForgetPasswordButton(true);
        setTimeout(() => setDisableForgetPasswordButton(false), 10000);
      } catch (e) {
        setSuccessMessage(null);
        setErrorMessage(e);
      }
    }
  }

  async function handleResendVerificationEmail() {
    resetMessages();

    try {
      dispatch(sendEmailVerification(email, password));
    } catch (e) {
      setSuccessMessage(null);
      setErrorMessage(e.message);
    }
  }

  return (
    <FormContainer>
      <H1>Sign In</H1>
      {verifyEmail && !errorMessage && (
        <Message variant="success">Email verification sent.</Message>
      )}
      {!loading && errorMessage && (
        <Message variant="danger">{errorMessage}</Message>
      )}
      {resendVerifyEmail && (
        <>
          <Button
            variant="dark"
            onClick={handleResendVerificationEmail}
            style={{ width: "100%", fontWeight: 400 }}
          >
            Resend verification Email
          </Button>
          <Spacer h="d" />
        </>
      )}
      {successMessage && !errorMessage && (
        <Message variant="success">{successMessage}</Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <StyledFormLabel>Email Address</StyledFormLabel>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderBottom: `1px solid ${gray}`,
              borderRadius: 0,
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              textColor: `${gray}`,
              fontWeight: 200,
            }}
          ></Form.Control>
        </Form.Group>

        <PasswordInput setPassword={setPassword} password={password} />
        <Button
          type="submit"
          variant="dark"
          style={{ width: "100%", fontWeight: 400 }}
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <Button
            variant="dark"
            style={{ width: "100%", fontWeight: 400 }}
            onClick={handleForgetPassword}
            disabled={disableForgetPasswordButton}
          >
            Forget Password?
          </Button>
          <Body>
            New Customer? <CustomLink linkTo={"/register"}>Register</CustomLink>
          </Body>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
