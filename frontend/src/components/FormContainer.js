import React from "react";
import styled from "styled-components";
import { noSelect } from "../styles/responsive";
import { gray, darkGray } from "../styles/colors";
import { FooterText } from "../styles/typography";

const LeftContainer = styled.div({
  width: "50%",
  height: "100vh",
  textAlign: "left",
});

const InnerContainer = styled.div({
  padding: "50px",
});

const Container = styled.div({
  display: "flex",
  flexDirection: "col",
  height: "100vh",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
});

const LandingImage = styled.img({
  ...noSelect(),
  height: "auto",
  width: "67vw",
});

const Footer = styled.div({
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  color: darkGray,
  position: "absolute",
  bottom: "10px",
  padding: "10px",
  width: "33%",
});

const FormContainer = ({ children }) => {
  return (
    <Container>
      <LeftContainer>
        <InnerContainer>{children}</InnerContainer>
      </LeftContainer>
    </Container>
  );
};

export default FormContainer;
