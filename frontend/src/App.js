import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import { Container } from "react-bootstrap";
import "./App.css";
import ReactDOM from "react-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <Router>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/login" component={LoginScreen} exact />
    </Router>
  );
}

export default App;
